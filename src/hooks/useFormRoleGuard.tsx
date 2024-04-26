import React, {
  memo,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { FormRoleGuard, formRoleGuard } from '@config/formRoleGuard'
import { useAuthentication } from '@client/ApiContext'

export interface UseFormRoleGuardReturnType {
  handleFieldRoleGuard: (v: string) => FormRoleGuard
}
export interface UseSetFormRoleGuardReturnType {
  handleSetCurrentForm: (v: string) => void
}

export const RoleGuardContext = createContext<{
  handleSetCurrentForm: (v: string | null) => void
  handleFieldRoleGuard: (v: string) => FormRoleGuard
}>({
  handleSetCurrentForm: (v: string | null) => {},
  handleFieldRoleGuard: (v: string) => ({}),
})
export const RoleGuardContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const currentUser = useAuthentication()
  const isStaff = currentUser?.isStaff
  const formRoleGuardConfig =
    formRoleGuard[isStaff ? 'juristic' : 'super-admin']
  const [currentFormName, setFormName] = useState<
    keyof typeof formRoleGuardConfig | null
  >(null)

  const handleSetCurrentForm = useCallback(
    (formName: keyof typeof formRoleGuardConfig | null) => {
      setFormName(formName)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFieldRoleGuard = useCallback(
    (fieldName: string): FormRoleGuard => {
      if (
        currentFormName &&
        formRoleGuardConfig[currentFormName]?.[fieldName]
      ) {
        return formRoleGuardConfig[currentFormName][fieldName]
      }
      return {}
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFormName, formRoleGuardConfig]
  )

  return (
    <RoleGuardContext.Provider
      value={{
        handleSetCurrentForm,
        handleFieldRoleGuard,
      }}
    >
      {children}
    </RoleGuardContext.Provider>
  )
}

export const useSetRoleGuard = (): UseSetFormRoleGuardReturnType => {
  const { handleSetCurrentForm } = useContext(RoleGuardContext)
  useEffect(() => {
    return () => {
      handleSetCurrentForm(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { handleSetCurrentForm }
}

export const useRoleGuard = (): UseFormRoleGuardReturnType => {
  const { handleFieldRoleGuard } = useContext(RoleGuardContext)
  return { handleFieldRoleGuard }
}

export const useFieldRoleGuard = (fieldName: string) => {
  const { handleSetCurrentForm, handleFieldRoleGuard } =
    useContext(RoleGuardContext)
  return { handleSetCurrentForm, handleFieldRoleGuard }
}

export const RoleWrapperField = ({
  children,
  name,
}: {
  children: (roleGuardProps: { roleGuardProps: FormRoleGuard }) => JSX.Element
  name: string
}) => {
  const { handleFieldRoleGuard } = useRoleGuard()

  const roleGuardProps = handleFieldRoleGuard(name)

  return children({ roleGuardProps })
}

export const DisplayRoleGuard = memo(
  ({
    isJuristicOnly,
    isSuperAdminOnly,
    children: node,
  }: {
    isJuristicOnly?: boolean
    isSuperAdminOnly?: boolean
    children: React.ReactNode
  }) => {
    const currentUser = useAuthentication()
    const isStaff = currentUser?.isStaff
    const isDisplay =
      (isJuristicOnly && isStaff) ||
      (isSuperAdminOnly && !isStaff) ||
      (!isJuristicOnly && !isSuperAdminOnly)
    return <div className={`${!isDisplay && 'hidden'}`}>{node}</div>
  }
)
