import { useState } from 'react';
import { Settings, Package, X, Plus, Trash2, Save, Eye, EyeOff, Lock } from 'lucide-react';
import { useBusinessSettings } from '../hooks/useBusinessSettings';
import { Category, Product, BusinessSettings } from '../backend';
import TemplateEditor from './TemplateEditor';

const ADMIN_PIN = '1234';

interface LocalProduct extends Product {
  id: string;
}

const DEFAULT_SETTINGS: BusinessSettings = {
  companyName: 'MAHAVEER PLYWOOD & INTERIORS',
  primaryPhone: '',
  secondaryPhone: '',
  email: '',
  businessHours: 'Mon-Sat: 9 AM - 7 PM',
  address: 'Sagwara, Dungarpur, Rajasthan',
  whatsappNumber: '',
  estimateMessageTemplate: 'Hello {companyName},\n\nQuick Estimate Request:\nName: {name}\nPhone: {phone}\nRequirement: {requirement}\nBudget: {budget}\nMessage: {message}\n\nPlease share premium options + approximate quote.',
  contractorInquiryTemplate: 'Hello {companyName},\n\nContractor Enquiry:\nCompany: {companyName}\nContact: {contactName}\nPhone: {phone}\nProject Type: {projectType}\nQuantity: {quantity}\nMessage: {message}\n\nPlease share bulk pricing & availability.',
  siteVisitTemplate: 'Hello {companyName},\n\nSite Visit Request:\nName: {name}\nPhone: {phone}\nPreferred Date: {date}\nWork Type: {workType}\nAddress/Area: {address}\n\nPlease confirm suitable time for site visit.',
  productInquiryTemplate: 'Hello {companyName},\n\nProduct Inquiry:\n• {product}\n\nCity/Area:\nQuantity:\nBrand preference (if any):',
  quoteBuilderTemplate: 'Hello {companyName},\n\nPremium Quote Request:\n\nSelected Modules:\n{modules}\n\nClient Details:\nName: {name}\nPhone: {phone}\n\nPlease provide detailed quotation.',
};

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [showPin, setShowPin] = useState(false);

  const { data: settings, updateSettings, isUpdating } = useBusinessSettings();

  // Local products state (localStorage-based)
  const [localProducts, setLocalProducts] = useState<LocalProduct[]>(() => {
    try {
      const stored = localStorage.getItem('admin_products');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: Category.plywood,
    description: '',
    specifications: '',
    image: '',
  });

  // Business settings form state
  const [settingsForm, setSettingsForm] = useState<BusinessSettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...(settings || {}),
  }));

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
      // Sync settings form with current settings
      if (settings) {
        setSettingsForm({ ...DEFAULT_SETTINGS, ...settings });
      }
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  const saveProducts = (products: LocalProduct[]) => {
    setLocalProducts(products);
    localStorage.setItem('admin_products', JSON.stringify(products));
  };

  const handleAddProduct = () => {
    if (!newProduct.name.trim()) return;
    const product: LocalProduct = {
      ...newProduct,
      id: Date.now().toString(),
    };
    saveProducts([...localProducts, product]);
    setNewProduct({
      name: '',
      category: Category.plywood,
      description: '',
      specifications: '',
      image: '',
    });
  };

  const handleDeleteProduct = (id: string) => {
    saveProducts(localProducts.filter((p) => p.id !== id));
  };

  const handleSaveSettings = async () => {
    await updateSettings(settingsForm);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex items-center justify-center w-11 h-11 bg-secondary border border-border hover:border-primary/40 text-foreground/60 hover:text-primary rounded-full shadow-md transition-all duration-300"
        aria-label="Admin Panel"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-background/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full sm:w-[600px] h-full sm:h-auto sm:max-h-[90vh] bg-card border-0 sm:border border-border sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-base sm:text-lg font-bold text-foreground">Admin Panel</h2>
          </div>
          <button
            onClick={() => { setIsOpen(false); setIsAuthenticated(false); setPin(''); }}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* PIN Authentication */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mx-auto mb-4">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground text-center mb-1">Admin Access</h3>
              <p className="text-sm text-foreground/60 text-center mb-6">Enter PIN to continue</p>
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-center text-lg font-mono tracking-widest text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[52px]"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pinError && (
                  <p className="text-xs text-destructive text-center">{pinError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors min-h-[48px]"
                >
                  Unlock
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs - scrollable on mobile */}
            <div className="flex border-b border-border flex-shrink-0 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === 'products'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
              >
                <Package className="w-4 h-4" />
                Products
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
              >
                <Settings className="w-4 h-4" />
                Business Settings
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {activeTab === 'products' && (
                <div className="space-y-5 sm:space-y-6">
                  {/* Add Product Form */}
                  <div className="bg-secondary/30 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Add New Product</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Product name"
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
                      />
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as Category })}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
                      >
                        {Object.values(Category).map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                      <input
                        type="text"
                        value={newProduct.specifications}
                        onChange={(e) => setNewProduct({ ...newProduct, specifications: e.target.value })}
                        placeholder="Specifications"
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
                      />
                      <input
                        type="text"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        placeholder="Image URL (optional)"
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
                      />
                      <button
                        onClick={handleAddProduct}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors min-h-[44px]"
                      >
                        <Plus className="w-4 h-4" />
                        Add Product
                      </button>
                    </div>
                  </div>

                  {/* Product List */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Products ({localProducts.length})
                    </h3>
                    {localProducts.length === 0 ? (
                      <p className="text-sm text-foreground/50 text-center py-8">
                        No products added yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {localProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-start gap-3 p-3 bg-secondary/20 border border-border rounded-xl"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                              <p className="text-xs text-foreground/50 capitalize">{product.category}</p>
                              {product.description && (
                                <p className="text-xs text-foreground/40 mt-0.5 line-clamp-2">{product.description}</p>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-5 sm:space-y-6">
                  {/* Business Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Business Information</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'companyName', label: 'Company Name', type: 'text' },
                        { key: 'primaryPhone', label: 'Primary Phone', type: 'tel' },
                        { key: 'secondaryPhone', label: 'Secondary Phone', type: 'tel' },
                        { key: 'email', label: 'Email', type: 'email' },
                        { key: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel' },
                        { key: 'businessHours', label: 'Business Hours', type: 'text' },
                      ].map(({ key, label, type }) => (
                        <div key={key}>
                          <label className="block text-xs font-medium text-foreground/70 mb-1">
                            {label}
                          </label>
                          <input
                            type={type}
                            value={settingsForm[key as keyof BusinessSettings]}
                            onChange={(e) => setSettingsForm({ ...settingsForm, [key]: e.target.value })}
                            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-xs font-medium text-foreground/70 mb-1">
                          Address
                        </label>
                        <textarea
                          value={settingsForm.address}
                          onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Templates */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">WhatsApp Templates</h3>
                    <div className="space-y-4">
                      <TemplateEditor
                        templateName="Estimate Request Template"
                        templateValue={settingsForm.estimateMessageTemplate}
                        onChange={(v) => setSettingsForm({ ...settingsForm, estimateMessageTemplate: v })}
                        availablePlaceholders={[
                          { key: 'companyName', description: 'Company name' },
                          { key: 'name', description: 'Customer name' },
                          { key: 'phone', description: 'Customer phone' },
                          { key: 'requirement', description: 'Service requirement' },
                          { key: 'budget', description: 'Budget range' },
                          { key: 'message', description: 'Additional message' },
                        ]}
                        sampleData={{
                          companyName: 'MAHAVEER PLYWOOD',
                          name: 'Rahul Sharma',
                          phone: '9876543210',
                          requirement: 'Modular Kitchen',
                          budget: '3L - 5L',
                          message: 'Need urgent delivery',
                        }}
                      />
                      <TemplateEditor
                        templateName="Contractor Inquiry Template"
                        templateValue={settingsForm.contractorInquiryTemplate}
                        onChange={(v) => setSettingsForm({ ...settingsForm, contractorInquiryTemplate: v })}
                        availablePlaceholders={[
                          { key: 'companyName', description: 'Company name' },
                          { key: 'contactName', description: 'Contact person name' },
                          { key: 'phone', description: 'Phone number' },
                          { key: 'projectType', description: 'Project type' },
                          { key: 'quantity', description: 'Order quantity' },
                          { key: 'message', description: 'Additional message' },
                        ]}
                        sampleData={{
                          companyName: 'ABC Builders',
                          contactName: 'Suresh Kumar',
                          phone: '9876543210',
                          projectType: 'Residential',
                          quantity: '50 sheets',
                          message: 'Need urgent delivery',
                        }}
                      />
                      <TemplateEditor
                        templateName="Site Visit Template"
                        templateValue={settingsForm.siteVisitTemplate}
                        onChange={(v) => setSettingsForm({ ...settingsForm, siteVisitTemplate: v })}
                        availablePlaceholders={[
                          { key: 'companyName', description: 'Company name' },
                          { key: 'name', description: 'Customer name' },
                          { key: 'phone', description: 'Phone number' },
                          { key: 'date', description: 'Preferred date' },
                          { key: 'workType', description: 'Type of work' },
                          { key: 'address', description: 'Site address' },
                        ]}
                        sampleData={{
                          companyName: 'MAHAVEER PLYWOOD',
                          name: 'Rahul Sharma',
                          phone: '9876543210',
                          date: '15 March 2026',
                          workType: 'Full Interior',
                          address: '123 MG Road, Bangalore',
                        }}
                      />
                      <TemplateEditor
                        templateName="Product Inquiry Template"
                        templateValue={settingsForm.productInquiryTemplate}
                        onChange={(v) => setSettingsForm({ ...settingsForm, productInquiryTemplate: v })}
                        availablePlaceholders={[
                          { key: 'companyName', description: 'Company name' },
                          { key: 'product', description: 'Product name' },
                          { key: 'category', description: 'Product category' },
                          { key: 'specifications', description: 'Product specifications' },
                        ]}
                        sampleData={{
                          companyName: 'MAHAVEER PLYWOOD',
                          product: 'Premium Plywood 18mm',
                          category: 'plywood',
                          specifications: '8x4 ft, 18mm thickness',
                        }}
                      />
                      <TemplateEditor
                        templateName="Quote Builder Template"
                        templateValue={settingsForm.quoteBuilderTemplate}
                        onChange={(v) => setSettingsForm({ ...settingsForm, quoteBuilderTemplate: v })}
                        availablePlaceholders={[
                          { key: 'companyName', description: 'Company name' },
                          { key: 'modules', description: 'Selected modules' },
                          { key: 'name', description: 'Customer name' },
                          { key: 'phone', description: 'Phone number' },
                          { key: 'city', description: 'City' },
                        ]}
                        sampleData={{
                          companyName: 'MAHAVEER PLYWOOD',
                          modules: 'Kitchen, Wardrobe, TV Unit',
                          name: 'Rahul Sharma',
                          phone: '9876543210',
                          city: 'Bangalore',
                        }}
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSaveSettings}
                    disabled={isUpdating}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 min-h-[48px]"
                  >
                    {isUpdating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Settings
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
