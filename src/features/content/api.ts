import { Platform } from "react-native";
import { WEB_ARTICLE_SNAPSHOT, WEB_PRODUCT_SNAPSHOT } from "./webFallback";

const ANGIA_API_BASE_URL = "https://angiagreen-backend.vercel.app/api";
const ANGIA_WEB_BASE_URL = "https://angiagreen.vercel.app";

type LocalizedText = Partial<Record<"vi" | "en" | "zh", string>>;

export type AngiaProduct = {
  benefits?: Partial<Record<"vi" | "en" | "zh", string[]>>;
  categoryId?: string;
  certifications?: string[];
  description?: LocalizedText;
  discount?: number;
  id?: string;
  image?: string;
  images?: string[];
  inStock?: boolean;
  name?: LocalizedText;
  origin?: string;
  originalPrice?: number;
  price?: number;
  shortDescription?: LocalizedText;
  slug?: string;
  traceability?: string | { batch?: string; qrCode?: string; region?: string };
  usage?: LocalizedText;
};

export type AngiaArticle = {
  author?: string;
  category?: string;
  excerpt?: LocalizedText;
  id?: string;
  image?: string;
  publishedAt?: string;
  slug?: string;
  tags?: string[];
  title?: LocalizedText;
};

type ListResponse<T> = { items?: T[] } | T[];

export type RemoteProduct = {
  benefits: string[];
  categoryId: string;
  certifications: string[];
  description: string;
  id: string;
  imageUrl: string;
  inStock: boolean;
  name: string;
  originalPrice: string;
  origin: string;
  price: string;
  purchaseUrl: string;
  shortDescription: string;
  slug: string;
  tag: string;
  traceability: string;
  usage: string;
};

export type RemoteNewsItem = {
  author: string;
  category: string;
  date: string;
  id: string;
  imageUrl: string;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
  url: string;
};

function pickVi(value: LocalizedText | undefined, fallback = "") {
  return value?.vi || value?.en || value?.zh || fallback;
}

function normalizeList<T>(payload: ListResponse<T>): T[] {
  return Array.isArray(payload) ? payload : payload.items ?? [];
}

function normalizeImageUrl(value: string | undefined) {
  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${ANGIA_WEB_BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function formatPrice(value: number | undefined) {
  if (typeof value !== "number") {
    return "Liên hệ";
  }

  return new Intl.NumberFormat("vi-VN", { currency: "VND", style: "currency" }).format(value);
}

function formatDate(value: string | undefined) {
  if (!value) {
    return "Mới cập nhật";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function cleanMarkdown(value: string | undefined) {
  return (value || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatTraceability(value: AngiaProduct["traceability"]) {
  if (!value) {
    return "Đang cập nhật";
  }

  if (typeof value === "string") {
    return value;
  }

  return [value.batch, value.region, value.qrCode ? `QR ${value.qrCode}` : ""].filter(Boolean).join(" • ") || "Đang cập nhật";
}

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${ANGIA_API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error(`Angia API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function toProduct(item: AngiaProduct): RemoteProduct {
  const slug = item.slug || item.id || "san-pham";
  const shortDescription = cleanMarkdown(pickVi(item.shortDescription, pickVi(item.description, "Sản phẩm An Gia Green")));
  const description = cleanMarkdown(pickVi(item.description, shortDescription));
  const certifications = item.certifications ?? [];

  return {
    benefits: item.benefits?.vi ?? item.benefits?.en ?? item.benefits?.zh ?? [],
    categoryId: item.categoryId || "san-pham",
    certifications,
    description,
    id: slug,
    imageUrl: normalizeImageUrl(item.image || item.images?.[0]),
    inStock: item.inStock ?? true,
    name: pickVi(item.name, "Sản phẩm An Gia Green"),
    originalPrice: item.originalPrice ? formatPrice(item.originalPrice) : "",
    origin: item.origin || "An Gia Green",
    price: formatPrice(item.price),
    purchaseUrl: `${ANGIA_WEB_BASE_URL}/san-pham/${slug}`,
    shortDescription,
    slug,
    tag: certifications[0] || item.categoryId || "An Gia Green",
    traceability: formatTraceability(item.traceability),
    usage: cleanMarkdown(pickVi(item.usage, ""))
  };
}

export function toNewsItem(item: AngiaArticle): RemoteNewsItem {
  const slug = item.slug || item.id || "tin-tuc";

  return {
    author: item.author || "An Gia Green",
    category: item.category || "Tin tức",
    date: formatDate(item.publishedAt),
    id: slug,
    imageUrl: normalizeImageUrl(item.image),
    slug,
    summary: cleanMarkdown(pickVi(item.excerpt, "Cập nhật mới từ An Gia Green.")),
    tags: item.tags ?? [],
    title: pickVi(item.title, "Tin tức An Gia Green"),
    url: `${ANGIA_WEB_BASE_URL}/tin-tuc/${slug}`
  };
}

export function fallbackProductItems(): RemoteProduct[] {
  return [];
}

export function fallbackNewsItems(): RemoteNewsItem[] {
  return [];
}
function canUseWebSnapshot() {
  return Platform.OS === "web";
}

export async function fetchProducts() {
  try {
    const payload = await requestJson<ListResponse<AngiaProduct>>("/products");
    return normalizeList(payload).map(toProduct);
  } catch (error) {
    if (canUseWebSnapshot()) {
      return WEB_PRODUCT_SNAPSHOT.map(toProduct);
    }

    throw error;
  }
}

export async function fetchProductBySlug(slug: string) {
  try {
    const payload = await requestJson<AngiaProduct>(`/products/${encodeURIComponent(slug)}`);
    return toProduct(payload);
  } catch (error) {
    const snapshotItem = WEB_PRODUCT_SNAPSHOT.find(item => item.slug === slug || item.id === slug);
    if (canUseWebSnapshot() && snapshotItem) {
      return toProduct(snapshotItem);
    }

    throw error;
  }
}

export async function fetchNews() {
  try {
    const payload = await requestJson<ListResponse<AngiaArticle>>("/articles");
    return normalizeList(payload).map(toNewsItem);
  } catch (error) {
    if (canUseWebSnapshot()) {
      return WEB_ARTICLE_SNAPSHOT.map(toNewsItem);
    }

    throw error;
  }
}

export async function fetchNewsBySlug(slug: string) {
  try {
    const payload = await requestJson<AngiaArticle>(`/articles/${encodeURIComponent(slug)}`);
    return toNewsItem(payload);
  } catch (error) {
    const snapshotItem = WEB_ARTICLE_SNAPSHOT.find(item => item.slug === slug || item.id === slug);
    if (canUseWebSnapshot() && snapshotItem) {
      return toNewsItem(snapshotItem);
    }

    throw error;
  }
}
