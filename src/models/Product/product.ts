import { Expose } from 'class-transformer'

export default class Product {
	@Expose()
	id: number

	@Expose()
	name: null

	@Expose()
	price: string
}
