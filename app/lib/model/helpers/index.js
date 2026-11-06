import Admin from "../schemas/Admin";
import Category from "../schemas/Category";
import Customer from "../schemas/Customer";
import Order from "../schemas/Order";
import Policy from "../schemas/Policy";
import Product from "../schemas/Product";
import Promotion from "../schemas/Promotion";
import Subcategory from "../schemas/Subcategory";

export const platformUsers = {
	admin: Admin,
	customers: Customer
};

export const customerService = {
	Product,
	Order,
	Category,
	Subcategory,
	Policy,
	Promotion
};
