import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { BrandWizardPage } from './pages/BrandWizardPage';
import { BrandWizardSelectPage } from './pages/BrandWizardSelectPage';
import { DocsPage } from './pages/DocsPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { PurchaseSuccessPage } from './pages/PurchaseSuccessPage';
import { ProductsPage } from './pages/ProductsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="purchase/success" element={<PurchaseSuccessPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="brand-wizard" element={<BrandWizardSelectPage />} />
          <Route path="brand-wizard/:bundleId" element={<BrandWizardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
