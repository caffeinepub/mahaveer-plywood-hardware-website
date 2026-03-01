import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

// STOP: DONT INCLUDE MIGRATION WITHOUT ACTUAL TYPE CHANGES
// (with migration = Migration.run)
actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  // User Profile Types
  public type UserProfile = {
    name : Text;
  };

  // Business Settings Types
  public type BusinessSettings = {
    companyName : Text;
    primaryPhone : Text;
    secondaryPhone : Text;
    email : Text;
    businessHours : Text;
    address : Text;
    whatsappNumber : Text;
    estimateMessageTemplate : Text;
    contractorInquiryTemplate : Text;
    siteVisitTemplate : Text;
    productInquiryTemplate : Text;
    quoteBuilderTemplate : Text;
  };

  public type Category = {
    #plywood;
    #hardware;
    #laminates;
    #kitchen;
    #wardrobe;
    #electricals;
    #paints;
  };

  public type Product = {
    name : Text;
    category : Category;
    description : Text;
    specifications : Text;
    image : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  var businessSettings : ?BusinessSettings = null;
  let products = Map.empty<Text, Product>();

  // UserProfile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Functions

  // Public read: no auth check needed — any visitor (guest) can browse the catalog
  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func filterProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public query func searchProducts(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.name.contains(#text searchTerm) or p.description.contains(#text searchTerm);
      }
    );
  };

  // Admin-only: add a product
  public shared ({ caller }) func addProduct(
    name : Text,
    category : Category,
    description : Text,
    specifications : Text,
    image : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product : Product = {
      name;
      category;
      description;
      specifications;
      image;
    };
    products.add(name, product);
  };

  // Admin-only: edit an existing product (identified by its current name key)
  public shared ({ caller }) func editProduct(
    existingName : Text,
    name : Text,
    category : Category,
    description : Text,
    specifications : Text,
    image : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit products");
    };
    switch (products.get(existingName)) {
      case null {
        Runtime.trap("Product not found: " # existingName);
      };
      case (?_existing) {
        products.remove(existingName);
        let updated : Product = {
          name;
          category;
          description;
          specifications;
          image;
        };
        products.add(name, updated);
      };
    };
  };

  // Admin-only: delete a product
  public shared ({ caller }) func deleteProduct(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    switch (products.get(name)) {
      case null {
        Runtime.trap("Product not found: " # name);
      };
      case (?_) {
        products.remove(name);
      };
    };
  };

  // Business Settings Functions

  // Public read: any visitor can see contact info / hours
  public query func getBusinessSettings() : async ?BusinessSettings {
    businessSettings;
  };

  // Admin-only: update business settings and WhatsApp templates
  public shared ({ caller }) func updateBusinessSettings(settings : BusinessSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update business settings");
    };
    businessSettings := ?settings;
  };
};
