import { lazyRouteComponent, createFileRoute, Link } from '@tanstack/react-router';
import { notFound } from '@tanstack/react-router';
import {
  ChevronRight,
  Heart,
  Share2,
  Star,
  CheckCircle2,
  ShieldCheck,
  Package,
  Clock,
  Truck,
  Users,
} from "lucide-react";
import { FeaturesBanner } from "@/features/home/components/features-banner";
import { products } from "@/features/flash-deals/products/lib/product-data";
import { ProductImageCarousel } from "@/features/flash-deals/products/components/product-image-carousel";

export const Route = createFileRoute('/_authenticated/flash-deals/products/')({
  component: lazyRouteComponent(() => import('@/features/flash-deals/pages/flash-deal-products-page').then(m => ({ default: m.FlashDealProductsPage }))),
});

