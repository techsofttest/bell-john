export interface ProductTag {
    label: string;
    scheme?: 'new' | 'bestSeller' | 'premium' | 'standard' | 'outOfStock';
}

export interface ProductVariants {
    sizes?: string[];
    colors?: string[];
    packaging?: string[];
}

export interface Product {
    id: string | number;
    title: string;
    category: string;
    subCategory?: string;
    image: string;
    images?: string[];
    availability?: 'In Stock' | 'Limited Stock' | 'Out of Stock' | string;
    tag?: ProductTag;
    variants?: ProductVariants;
    description: string;
    specifications: Record<string, string>;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://bellnjohn.test:90/api';
export const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://bellnjohn.test:90/api/file';

export function encodeImageUrl(imagePath: string | null | undefined, storageUrl: string): string | null {
    if (!imagePath) return null;
    // If already a full URL (pre-encoded by the backend), use as-is
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
    // Fallback: encode each path segment individually for special chars
    const segments = imagePath.split('/').map(segment => encodeURIComponent(segment));
    return `${storageUrl}/${segments.join('/')}`;
}

export function mapLaravelProduct(laravelProduct: any): Product {
    if (!laravelProduct) return {} as Product;
    
    // Map tag based on is_featured
    let tag: ProductTag | undefined = undefined;
    if (laravelProduct.is_featured) {
        tag = { label: 'Best Seller', scheme: 'bestSeller' };
    }
    
    // Map variants
    const variants: ProductVariants = {};
    if (Array.isArray(laravelProduct.variant_options)) {
        laravelProduct.variant_options.forEach((group: any) => {
            const labelLower = group.label?.toLowerCase() || '';
            if (labelLower.includes('size')) {
                variants.sizes = group.attributes;
            } else if (labelLower.includes('color')) {
                variants.colors = group.attributes;
            } else if (labelLower.includes('unit') || labelLower.includes('pack') || labelLower.includes('packaging')) {
                variants.packaging = group.attributes;
            } else {
                if (!variants.packaging) {
                    variants.packaging = group.attributes;
                }
            }
        });
    }
    
    // Map image URLs
    // Prefer pre-encoded URLs from the backend (image_url / additional_images_urls)
    // to avoid encoding issues with filenames containing special chars (®, ", commas, etc.)
    const storageUrl = STORAGE_URL;
    const mainImage = laravelProduct.image_url
        ? laravelProduct.image_url
        : encodeImageUrl(laravelProduct.image, storageUrl);

    const additionalImages: string[] = [];
    if (Array.isArray(laravelProduct.additional_images_urls) && laravelProduct.additional_images_urls.length > 0) {
        // Use pre-encoded URLs provided by the backend
        laravelProduct.additional_images_urls.forEach((url: string) => {
            if (url) additionalImages.push(url);
        });
    } else if (Array.isArray(laravelProduct.additional_images)) {
        laravelProduct.additional_images.forEach((img: string) => {
            if (img) {
                additionalImages.push(encodeImageUrl(img, storageUrl));
            }
        });
    } else if (laravelProduct.additional_images && typeof laravelProduct.additional_images === 'string') {
        try {
            const parsed = JSON.parse(laravelProduct.additional_images);
            if (Array.isArray(parsed)) {
                parsed.forEach((img: string) => {
                    if (img) {
                        additionalImages.push(encodeImageUrl(img, storageUrl));
                    }
                });
            }
        } catch (e) {}
    }
    
    // Map specifications
    const specifications: Record<string, string> = {};
    if (laravelProduct.brand?.name) {
        specifications["Brand"] = laravelProduct.brand.name;
    }
    if (laravelProduct.sku) {
        specifications["SKU"] = laravelProduct.sku;
    }
    if (laravelProduct.product_id) {
        specifications["Product ID"] = laravelProduct.product_id;
    }
    if (laravelProduct.upc) {
        specifications["UPC"] = laravelProduct.upc;
    }
    specifications["Tax Class"] = laravelProduct.tax_class_code || "Standard";

    return {
        id: laravelProduct.slug || laravelProduct.id,
        title: laravelProduct.name,
        category: laravelProduct.sub_category?.name || laravelProduct.category?.name || 'Uncategorized',
        subCategory: laravelProduct.sub_sub_category?.slug || laravelProduct.sub_category?.slug || '',
        image: mainImage,
        images: additionalImages.length > 0 ? additionalImages : [mainImage],
        availability: 'In Stock',
        tag,
        variants,
        description: laravelProduct.description || '',
        specifications
    };
}

export async function getProductById(id: string | number, country?: string): Promise<Product | undefined> {
    try {
        let url = `${API_URL}/products/${id}`;
        if (country) {
            url += `?country=${encodeURIComponent(country)}`;
        }
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return undefined;
        const json = await res.json();
        if (json.status === 'success' && json.data) {
            return mapLaravelProduct(json.data);
        }
    } catch (e) {
        console.error('Error fetching product by ID:', e);
    }
    return undefined;
}

export async function getProductsByCategory(categorySlug: string, limit = 8, country?: string): Promise<Product[]> {
    try {
        let url = `${API_URL}/products?category=${categorySlug}&per_page=${limit}`;
        if (country) {
            url += `&country=${encodeURIComponent(country)}`;
        }
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
            return json.data.map(mapLaravelProduct);
        }
    } catch (e) {
        console.error('Error fetching products by category:', e);
    }
    return [];
}

export async function getRelatedProducts(product: Product, limit = 4, country?: string): Promise<Product[]> {
    try {
        let url = `${API_URL}/products/${product.id}`;
        if (country) {
            url += `?country=${encodeURIComponent(country)}`;
        }
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.related)) {
            return json.related.map(mapLaravelProduct).slice(0, limit);
        }
    } catch (e) {
        console.error('Error fetching related products:', e);
    }
    return [];
}

export async function getAllProducts(country?: string): Promise<Product[]> {
    try {
        let url = `${API_URL}/products?per_page=100`;
        if (country) {
            url += `&country=${encodeURIComponent(country)}`;
        }
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
            return json.data.map(mapLaravelProduct);
        }
    } catch (e) {
        console.error('Error fetching all products:', e);
    }
    return [];
}

export async function searchProducts(query: string, country?: string): Promise<Product[]> {
    try {
        let url = `${API_URL}/products?search=${encodeURIComponent(query)}&per_page=50`;
        if (country) {
            url += `&country=${encodeURIComponent(country)}`;
        }
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
            return json.data.map(mapLaravelProduct);
        }
    } catch (e) {
        console.error('Error searching products:', e);
    }
    return [];
}

export async function getCategoryDetails(slug: string): Promise<any> {
    try {
        const res = await fetch(`${API_URL}/categories/${slug}`, { cache: 'no-store' });
        if (!res.ok) return undefined;
        const json = await res.json();
        if (json.status === 'success' && json.data) {
            return json.data;
        }
    } catch (e) {
        console.error('Error fetching category details:', e);
    }
    return undefined;
}

export async function getProducts(params: Record<string, string>): Promise<{ products: Product[], total: number }> {
    try {
        const queryString = new URLSearchParams(params).toString();
        const res = await fetch(`${API_URL}/products?${queryString}`, { cache: 'no-store' });
        if (!res.ok) return { products: [], total: 0 };
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
            return {
                products: json.data.map(mapLaravelProduct),
                total: json.meta?.total || json.data.length
            };
        }
    } catch (e) {
        console.error('Error fetching products:', e);
    }
    return { products: [], total: 0 };
}

export async function getCategories(): Promise<any[]> {
    try {
        const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
        if (!res.ok) return [];
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
            return json.data;
        }
    } catch (e) {
        console.error('Error fetching categories:', e);
    }
    return [];
}


