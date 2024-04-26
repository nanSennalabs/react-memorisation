import { useContext } from "react";
import { Context } from "contexts/ClientContext";

export function useClient() {
  return useContext(Context).client._client;
}
