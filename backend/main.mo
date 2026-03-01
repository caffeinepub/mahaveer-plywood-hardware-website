import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Types
  public type UserProfile = {
    name : Text;
  };

  // Business Settings Types
  type BusinessSettings = {
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

  type Product = {
    name : Text;
    category : Category;
    description : Text;
    specifications : Text;
    image : Text;
  };

  type Category = {
    #plywood;
    #hardware;
    #laminates;
    #kitchen;
    #wardrobe;
    #electricals;
    #paints;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  var businessSettings : ?BusinessSettings = null;
  let products = Map.empty<Text, Product>();

  func categoryToText(category : Category) : Text {
    switch (category) {
      case (#plywood) { "plywood" };
      case (#hardware) { "hardware" };
      case (#laminates) { "laminates" };
      case (#kitchen) { "kitchen" };
      case (#wardrobe) { "wardrobe" };
      case (#electricals) { "electricals" };
      case (#paints) { "paints" };
    };
  };

  // User Profile Functions
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

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func filterProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.category == category;
      }
    );
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.name.contains(#text searchTerm) or p.description.contains(#text searchTerm);
      }
    );
  };

  // Business Settings Functions
  public query ({ caller }) func getBusinessSettings() : async ?BusinessSettings {
    businessSettings;
  };

  public shared ({ caller }) func updateBusinessSettings(settings : BusinessSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update business settings");
    };
    businessSettings := ?settings;
  };
};
