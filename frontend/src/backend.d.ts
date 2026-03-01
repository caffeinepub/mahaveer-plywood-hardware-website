import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BusinessSettings {
    siteVisitTemplate: string;
    businessHours: string;
    secondaryPhone: string;
    estimateMessageTemplate: string;
    productInquiryTemplate: string;
    email: string;
    whatsappNumber: string;
    contractorInquiryTemplate: string;
    address: string;
    companyName: string;
    primaryPhone: string;
    quoteBuilderTemplate: string;
}
export interface UserProfile {
    name: string;
}
export interface Product {
    specifications: string;
    name: string;
    description: string;
    category: Category;
    image: string;
}
export enum Category {
    plywood = "plywood",
    kitchen = "kitchen",
    electricals = "electricals",
    hardware = "hardware",
    wardrobe = "wardrobe",
    paints = "paints",
    laminates = "laminates"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, category: Category, description: string, specifications: string, image: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    filterProductsByCategory(category: Category): Promise<Array<Product>>;
    getAllProducts(): Promise<Array<Product>>;
    getBusinessSettings(): Promise<BusinessSettings | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    updateBusinessSettings(settings: BusinessSettings): Promise<void>;
}
