import { useState } from 'react';
import { Settings, Package, Lock, Plus, Trash2, Save, Eye, EyeOff, Loader2, X } from 'lucide-react';
import { useBusinessSettings, useUpdateBusinessSettings } from '../hooks/useBusinessSettings';
import TemplateEditor from './TemplateEditor';
import type { BusinessSettings, Product } from '../backend';
import { Category } from '../backend';

const ADMIN_PIN = '2580';

const categoryOptions: { value: Category; label: string }[] = [
  { value: Category.plywood, label: 'Plywood' },
  { value: Category.hardware, label: 'Hardware' },
  { value: Category.laminates, label: 'Laminates' },
  { value: Category.kitchen, label: 'Kitchen' },
  { value: Category.wardrobe, label: 'Wardrobe' },
  { value: Category.electricals, label: 'Electricals' },
  { value: Category.paints, label: 'Paints' },
];

interface AdminPanelProps {
  onClose?: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'templates'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  const { data: settings } = useBusinessSettings();
  const updateSettingsMutation = useUpdateBusinessSettings();

  const [settingsForm, setSettingsForm] = useState<Partial<BusinessSettings>>({});

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
      if (settings) setSettingsForm(settings);
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setPin('');
    if (onClose) onClose();
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) return;
    const product: Product = {
      name: newProduct.name,
      category: newProduct.category as Category,
      description: newProduct.description || '',
      specifications: newProduct.specifications || '',
      image: newProduct.image || '',
    };
    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem('adminProducts', JSON.stringify(updated));
    setNewProduct({});
  };

  const handleRemoveProduct = (name: string) => {
    const updated = products.filter((p) => p.name !== name);
    setProducts(updated);
    localStorage.setItem('adminProducts', JSON.stringify(updated));
  };

  const handleSaveSettings = async () => {
    if (!settingsForm) return;
    await updateSettingsMutation.mutateAsync(settingsForm as BusinessSettings);
  };

  const isSaving = updateSettingsMutation.isPending;

  const inputClass =
    'w-full px-3 py-2 bg-white border border-gold-200 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all text-sm';
  const labelClass = 'block text-xs font-medium text-foreground/70 mb-1';

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white border border-gold-200 rounded-2xl shadow-luxury-xl p-8 w-full max-w-sm mx-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-gold-600" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">Admin Access</h2>
                <p className="text-xs text-muted-foreground">Enter your PIN to continue</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gold-50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                className={inputClass}
                maxLength={6}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {pinError && <p className="text-xs text-destructive">{pinError}</p>}
            <button
              type="submit"
              className="w-full py-2.5 btn-gold font-semibold text-sm rounded-xl transition-all"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gold-200 bg-white">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-gold-600" />
          <h1 className="font-serif text-xl font-bold text-foreground">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLock}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Lock className="w-4 h-4" />
            Lock
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gold-50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gold-200 bg-white px-6">
        {(['products', 'settings', 'templates'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-gold-500 text-gold-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-cream-100">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white border border-gold-200 rounded-2xl p-6 shadow-luxury">
              <h3 className="font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-gold-600" />
                Add New Product
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name || ''}
                    onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Product name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Category *</label>
                  <select
                    value={newProduct.category || ''}
                    onChange={(e) => setNewProduct((p) => ({ ...p, category: e.target.value as Category }))}
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <input
                    type="text"
                    value={newProduct.description || ''}
                    onChange={(e) => setNewProduct((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Short description"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Specifications</label>
                  <input
                    type="text"
                    value={newProduct.specifications || ''}
                    onChange={(e) => setNewProduct((p) => ({ ...p, specifications: e.target.value }))}
                    placeholder="e.g. 18mm, BWR Grade"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Image URL</label>
                  <input
                    type="text"
                    value={newProduct.image || ''}
                    onChange={(e) => setNewProduct((p) => ({ ...p, image: e.target.value }))}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                onClick={handleAddProduct}
                disabled={!newProduct.name || !newProduct.category}
                className="flex items-center gap-2 px-4 py-2 btn-gold text-sm font-semibold rounded-xl transition-all disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            {/* Product List */}
            {products.length > 0 && (
              <div className="bg-white border border-gold-200 rounded-2xl shadow-luxury overflow-hidden">
                <div className="p-4 border-b border-gold-200">
                  <h3 className="font-serif font-bold text-foreground flex items-center gap-2">
                    <Package className="w-4 h-4 text-gold-600" />
                    Products ({products.length})
                  </h3>
                </div>
                <div className="divide-y divide-gold-100">
                  {products.map((product) => (
                    <div key={product.name} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium text-foreground text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.category} · {product.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(product.name)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gold-200 rounded-2xl p-6 shadow-luxury space-y-4">
              <h3 className="font-serif font-bold text-foreground mb-2">Business Settings</h3>
              {(
                [
                  { key: 'companyName', label: 'Company Name' },
                  { key: 'primaryPhone', label: 'Primary Phone' },
                  { key: 'secondaryPhone', label: 'Secondary Phone' },
                  { key: 'email', label: 'Email' },
                  { key: 'whatsappNumber', label: 'WhatsApp Number' },
                  { key: 'businessHours', label: 'Business Hours' },
                  { key: 'address', label: 'Address' },
                ] as { key: keyof BusinessSettings; label: string }[]
              ).map(({ key, label }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input
                    type="text"
                    value={(settingsForm[key] as string) || ''}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    placeholder={label}
                    className={inputClass}
                  />
                </div>
              ))}
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 btn-gold text-sm font-semibold rounded-xl transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && settings && (
          <div className="max-w-2xl mx-auto space-y-6">
            <TemplateEditor
              templateName="Estimate Message"
              templateValue={
                settingsForm.estimateMessageTemplate || settings.estimateMessageTemplate || ''
              }
              availablePlaceholders={['name', 'phone', 'projectType', 'budget', 'area']}
              sampleData={{
                name: 'Rahul',
                phone: '9876543210',
                projectType: 'Complete Home',
                budget: '₹8L–₹15L',
                area: '1200',
              }}
              onChange={(val) =>
                setSettingsForm((prev) => ({ ...prev, estimateMessageTemplate: val }))
              }
            />
            <TemplateEditor
              templateName="Contractor Inquiry"
              templateValue={
                settingsForm.contractorInquiryTemplate ||
                settings.contractorInquiryTemplate ||
                ''
              }
              availablePlaceholders={['name', 'phone', 'company', 'projectType', 'message']}
              sampleData={{
                name: 'Suresh',
                phone: '9876543210',
                company: 'ABC Builders',
                projectType: 'Residential',
                message: 'Need bulk pricing',
              }}
              onChange={(val) =>
                setSettingsForm((prev) => ({ ...prev, contractorInquiryTemplate: val }))
              }
            />
            <TemplateEditor
              templateName="Site Visit"
              templateValue={
                settingsForm.siteVisitTemplate || settings.siteVisitTemplate || ''
              }
              availablePlaceholders={['name', 'phone', 'address', 'date', 'time', 'notes']}
              sampleData={{
                name: 'Priya',
                phone: '9876543210',
                address: '123 MG Road, Pune',
                date: '2026-03-15',
                time: '10:00 AM – 12:00 PM',
                notes: 'New 3BHK',
              }}
              onChange={(val) =>
                setSettingsForm((prev) => ({ ...prev, siteVisitTemplate: val }))
              }
            />
            <TemplateEditor
              templateName="Product Inquiry"
              templateValue={
                settingsForm.productInquiryTemplate || settings.productInquiryTemplate || ''
              }
              availablePlaceholders={['products']}
              sampleData={{ products: '• BWR Plywood 18mm\n• Hettich Hinges' }}
              onChange={(val) =>
                setSettingsForm((prev) => ({ ...prev, productInquiryTemplate: val }))
              }
            />
            <TemplateEditor
              templateName="Quote Builder"
              templateValue={
                settingsForm.quoteBuilderTemplate || settings.quoteBuilderTemplate || ''
              }
              availablePlaceholders={['rooms', 'tier', 'estimate']}
              sampleData={{
                rooms: 'Living Room, Kitchen, Master Bedroom',
                tier: 'Premium',
                estimate: '₹4,50,000 – ₹5,85,000',
              }}
              onChange={(val) =>
                setSettingsForm((prev) => ({ ...prev, quoteBuilderTemplate: val }))
              }
            />
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 btn-gold text-sm font-semibold rounded-xl transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Templates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
