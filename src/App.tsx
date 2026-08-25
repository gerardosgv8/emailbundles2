import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WizardGate } from './components/WizardGate';
import { SiteLayout } from './components/SiteLayout';
import { BrandWizardPage } from './pages/BrandWizardPage';
import { BrandWizardSelectPage } from './pages/BrandWizardSelectPage';
import { ContentWizardPage } from './pages/ContentWizardPage';
import { ContentWizardSelectPage } from './pages/ContentWizardSelectPage';
import { DocsPage } from './pages/DocsPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { PurchaseSuccessPage } from './pages/PurchaseSuccessPage';
import { WizardAccessPage } from './pages/WizardAccessPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';
import { WizardAccessProvider } from './wizard-access/WizardAccessProvider';
// import { TestimonialsPage } from './pages/TestimonialsPage'; // saved for later

export function App() {
  return (
    <WizardAccessProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="purchase/success" element={<PurchaseSuccessPage />} />
            <Route path="wizard-access" element={<WizardAccessPage />} />
            {/* <Route path="testimonials" element={<TestimonialsPage />} /> */}
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route
              path="brand-wizard"
              element={
                <WizardGate>
                  <BrandWizardSelectPage />
                </WizardGate>
              }
            />
            <Route
              path="brand-wizard/:bundleId"
              element={
                <WizardGate>
                  <BrandWizardPage />
                </WizardGate>
              }
            />
            <Route
              path="content-wizard"
              element={
                <WizardGate>
                  <ContentWizardSelectPage />
                </WizardGate>
              }
            />
            <Route
              path="content-wizard/:bundleId"
              element={
                <WizardGate>
                  <ContentWizardPage />
                </WizardGate>
              }
            />
            <Route
              path="content-wizard/:bundleId/:templateSlug"
              element={
                <WizardGate>
                  <ContentWizardPage />
                </WizardGate>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WizardAccessProvider>
  );
}
