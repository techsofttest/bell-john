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

export const allProducts: Product[] = [
    // ==========================================
    // 1. STATIONERY & SUPPLIES (IDs 1-40, 101-102)
    // ==========================================
    {
        id: 1,
        title: "Premium A4 Copy Paper - 500 Sheets",
        category: "Stationery",
        subCategory: "a4-copy-paper",
        image: "https://plus.unsplash.com/premium_photo-1661761048600-47c32729c628?q=80&w=600",
        images: [
            "https://plus.unsplash.com/premium_photo-1661761048600-47c32729c628?q=80&w=600",
            "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600",
        ],
        tag: { label: "Best Seller", scheme: "bestSeller" },
        availability: "In Stock",
        variants: {
            packaging: ["Single Ream", "Box of 5 Reams", "Pallet (40 Boxes)"]
        },
        description: "High-grade 80GSM copy paper engineered for high-volume corporate printing, copying, and faxing. Features high brightness and smooth texture to prevent paper jams in enterprise multi-function printers.",
        specifications: {
            "Brand": "Double A / Premium",
            "Paper Size": "A4 (210mm x 297mm)",
            "Weight": "80 GSM",
            "Opacity": "94%",
            "Whiteness": "165 CIE",
            "Sheets per Ream": "500 Sheets",
            "Acid Free": "Yes, suitable for archiving"
        }
    },
    {
        id: 2,
        title: "Leitz 180° Hardboard F/S Lever Arch Files",
        category: "Stationery",
        subCategory: "filing-folders",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
        tag: { label: "New", scheme: "new" },
        availability: "In Stock",
        variants: {
            sizes: ["50mm", "75mm", "80mm"],
            colors: ["Black", "Blue", "Red", "Green", "Yellow"]
        },
        description: "Premium heavy-duty board Lever Arch File with patented 180° mechanism that opens 50% wider and allows archiving from both sides. Wrapped in durable, soil-resistant paperboard for executive file storage.",
        specifications: {
            "Brand": "Leitz",
            "Mechanism Type": "Patented 180° Precision Lever Arc",
            "Spine Width": "75 mm (approx. 500 sheets capacity)",
            "Format": "Foolscap / A4",
            "Material": "Recycled Board, PP Laminated",
            "Finger Hole": "Yes, metal reinforced",
            "Spine Label": "Replaceable in pocket"
        }
    },
    {
        id: 3,
        title: "Pilot G2 Premium Gel Pens (Pack of 12)",
        category: "Stationery",
        subCategory: "premium-pens",
        image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600",
        availability: "In Stock",
        variants: {
            colors: ["Black", "Blue", "Red", "Green"],
            packaging: ["Box of 12", "Bulk 72 (6 Boxes)"]
        },
        description: "The gold standard of gel ink pens. Features a contoured rubber grip for writing comfort, a dynamic gel ink formula for ultra-smooth writing, and a retractable tip for long-lasting office use.",
        specifications: {
            "Brand": "Pilot",
            "Point Size": "0.7 mm (Fine)",
            "Ink Type": "Water-resistant, smear-proof gel ink",
            "Refillable": "Yes (G2 Refills)",
            "Grip Material": "Latex-free comfortable rubber",
            "Clip Type": "Pocket Clip"
        }
    },
    {
        id: 4,
        title: "3M Post-it Canary Yellow Sticky Notes",
        category: "Stationery",
        subCategory: "paper-notebooks",
        image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600",
        availability: "In Stock",
        variants: {
            sizes: ["3x3 in", "4x4 in", "4x6 in"],
            packaging: ["Single Pad", "6-Pad Value Pack", "12-Pad Cabinet Pack"]
        },
        description: "The classic canary yellow adhesive note pads. Perfect for capturing brainstorm ideas, sending brief updates, and marking physical pages with secure, clean-removal adhesive.",
        specifications: {
            "Brand": "3M Post-it",
            "Color": "Classic Canary Yellow",
            "Size": "3 in x 3 in (76mm x 76mm)",
            "Sheets per Pad": "100 Sheets",
            "Adhesive Type": "Repositionable pressure-sensitive",
            "Recyclable": "Yes"
        }
    },
    {
        id: 5,
        title: "Moleskine Classic Ruled Notebook Large",
        category: "Stationery",
        subCategory: "executive-notebooks",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
        tag: { label: "Premium", scheme: "premium" },
        availability: "In Stock",
        variants: {
            sizes: ["Pocket", "Medium", "Large", "XL"],
            colors: ["Black", "Red", "Navy", "Forest Green", "Sapphire Blue"]
        },
        description: "The legendary executive notebook. Bound with rounded corners, acid-free paper, a matching ribbon bookmark, and an elastic closure. Features an expandable inner pocket to keep loose sheets organized.",
        specifications: {
            "Brand": "Moleskine",
            "Paper Weight": "70 GSM",
            "Size": "Large (13cm x 21cm)",
            "Page Count": "240 Pages",
            "Layout": "Ruled / Lined",
            "Cover Type": "Hardcover Polyurethane"
        }
    },
    {
        id: "labels-100",
        title: "Target Printable Computer Labels - 100 Sheets",
        category: "Stationery",
        subCategory: "desk-accessories",
        image: "/products/printer.jpg",
        availability: "In Stock",
        description: "Premium self-adhesive multi-purpose computer labels. Compatible with both laser and inkjet printers, offering smudge-free, high-definition printing for addressing, shipping, and indexing.",
        specifications: {
            "Brand": "Target",
            "Sheets": "100 Sheets per pack",
            "Adhesive": "Permanent Acrylic",
            "Compatibility": "Laser, Inkjet, Copier",
            "Format": "A4 Sheets"
        }
    },
    {
        id: "duraclip-30",
        title: "Durable Duraclip 30 A4 Presentation File",
        category: "Stationery",
        subCategory: "filing-folders",
        image: "/products/Durable Duraclip 30 A4 Presentation File.jfif",
        tag: { label: "New", scheme: "new" },
        availability: "In Stock",
        description: "High-quality presentation folder with a unique clip made of special spring steel. It adjusts to the thickness of your documents and won't lose its shape even after multiple uses. Holds up to 30 A4 sheets without punching holes.",
        specifications: {
            "Brand": "Durable",
            "Capacity": "30 Sheets (A4)",
            "Material": "PVC with Spring-Steel Clip",
            "Color": "Navy Blue",
            "Transparent Front": "Yes"
        }
    },

    // ==========================================
    // 2. DIGITAL SUPPLIES & IT (IDs 6-9, 103-104)
    // ==========================================
    {
        id: 6,
        title: "HP V241ib FHD 23.8-inch Monitor",
        category: "Digital Supplies",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",
        tag: { label: "Top Rated", scheme: "standard" },
        availability: "In Stock",
        description: "An elegant, budget-friendly 23.8-inch Full HD monitor built for professional office multi-tasking. Delivers crisp visuals and customizable tilt adjustments with low blue light settings to protect eyes during long work hours.",
        specifications: {
            "Brand": "HP",
            "Screen Size": "23.8 Inches",
            "Resolution": "FHD 1920 x 1080 @ 60Hz",
            "Panel Type": "VA (Vertical Alignment)",
            "Response Time": "5 ms GtG",
            "Ports": "1 x HDMI 1.4, 1 x VGA",
            "VESA Mountable": "Yes (100mm x 100mm)"
        }
    },
    {
        id: 7,
        title: "Logitech MX Master 3S Wireless Mouse",
        category: "Digital Supplies",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600",
        tag: { label: "New", scheme: "new" },
        availability: "In Stock",
        variants: {
            colors: ["Graphite", "Pale Gray"]
        },
        description: "The ultimate productivity mouse. Features Quiet Click switches, an 8K DPI track-anywhere optical sensor, and the revolutionary MagSpeed electromagnetic scroll wheel for high-precision scrolling through code or spreadsheets.",
        specifications: {
            "Brand": "Logitech",
            "Sensor Resolution": "200 to 8000 DPI",
            "Connectivity": "Bluetooth Low Energy & Logi Bolt USB Receiver",
            "Battery Life": "Up to 70 days on a full charge",
            "Fast Charging": "3 hours of use from 1-minute charge",
            "Weight": "141 grams"
        }
    },
    {
        id: 8,
        title: "SanDisk 1TB Extreme Portable SSD",
        category: "Digital Supplies",
        image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600",
        availability: "In Stock",
        variants: {
            sizes: ["500GB", "1TB", "2TB", "4TB"]
        },
        description: "Rugged and blazing fast portable solid-state drive built for transfer of massive design projects, high-res videos, and backups. IP55 dust and water resistant, with a practical carabiner loop.",
        specifications: {
            "Brand": "SanDisk",
            "Capacity": "1 TB",
            "Read Speed": "Up to 1050 MB/s",
            "Write Speed": "Up to 1000 MB/s",
            "Interface": "USB 3.2 Gen 2 Type-C",
            "Drop Protection": "Up to 2 meters",
            "Encryption": "256-bit AES Hardware Encryption"
        }
    },
    {
        id: 9,
        title: "APC Back-UPS Battery Backup & Surge Protector",
        category: "Digital Supplies",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600",
        availability: "In Stock",
        description: "Essential battery backup and surge protection for corporate workstations and networking gear. Keeps Wi-Fi router, PC, and external storage powered safely during blackouts.",
        specifications: {
            "Brand": "APC by Schneider Electric",
            "Capacity": "850VA / 520W",
            "Outlets": "9 Total (6 Battery Backup + Surge, 3 Surge Only)",
            "USB Ports": "2 (Type A + Type C) fast-charging ports",
            "Battery Type": "Lead-acid maintenance-free",
            "Warranty": "3-Year Limited Equipment Protection"
        }
    },
    {
        id: "samsung-980",
        title: "Samsung 980 Pro 2TB NVMe SSD",
        category: "Digital Supplies",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600",
        availability: "In Stock",
        description: "Next-level SSD performance. Unleash the power of the Samsung PCIe 4.0 NVMe SSD 980 PRO for your next-level computing, with read speeds up to 7,000 MB/s.",
        specifications: {
            "Brand": "Samsung",
            "Capacity": "2 TB",
            "Form Factor": "M.2 (2280)",
            "Interface": "PCIe Gen 4.0 x4, NVMe 1.3c",
            "Sequential Read": "Up to 7,000 MB/s",
            "Sequential Write": "Up to 5,000 MB/s"
        }
    },
    {
        id: "dell-27",
        title: "Dell UltraSharp 27 4K USB-C Hub Monitor",
        category: "Digital Supplies",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",
        tag: { label: "Professional", scheme: "premium" },
        availability: "In Stock",
        description: "Crafted for precision and ultimate productivity. This 27-inch 4K USB-C hub monitor features color coverage including 95% DCI-P3, RJ45 Ethernet connection, and up to 90W power delivery.",
        specifications: {
            "Brand": "Dell",
            "Screen Size": "27 Inches",
            "Resolution": "4K UHD 3840 x 2160 @ 60Hz",
            "Panel Type": "IPS Black Technology",
            "Contrast Ratio": "2000:1",
            "USB-C Power": "Up to 90W power delivery"
        }
    },

    // ==========================================
    // 3. OFFICE FURNITURE (IDs 10-13, 105-106)
    // ==========================================
    {
        id: 10,
        title: "Herman Miller Aeron Ergonomic Chair",
        category: "Office Furniture",
        image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600",
        tag: { label: "Premium", scheme: "premium" },
        availability: "In Stock",
        variants: {
            sizes: ["Size A (Small)", "Size B (Medium)", "Size C (Large)"],
            colors: ["Mineral", "Carbon", "Graphite"]
        },
        description: "The definitive ergonomic task chair. Features revolutionary 8Z Pellicle mesh suspension for optimal posture and spine alignment, paired with customizable PostureFit SL sacral support.",
        specifications: {
            "Brand": "Herman Miller",
            "Designer": "Bill Stumpf & Don Chadwick",
            "Material": "Recycled Plastic Ocean Bound, Glass-Filled Nylon, Elastomeric Mesh",
            "Adjustments": "Tilt Limiter, Seat Angle, Fully Adjustable Armrests, PostureFit SL Lumbar",
            "Warranty": "12-Year Multi-Shift Warranty"
        }
    },
    {
        id: 11,
        title: "Steelcase Series 1 Office Chair",
        category: "Office Furniture",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600",
        availability: "In Stock",
        variants: {
            colors: ["Black", "Midnight Blue", "Fog Gray", "Red Accent"]
        },
        description: "A compact, highly adjustable ergonomic chair that fits into any modern workspace. Features integrated LiveBack technology, which mimics the natural spine shape to support back health throughout the day.",
        specifications: {
            "Brand": "Steelcase",
            "Weight Capacity": "Up to 180 kg",
            "Adjustments": "Seat depth, 4D armrests, passive spine flex, height adjustment",
            "Frame Material": "Reinforced Structural Polyurethane",
            "Eco Certification": "Cradle to Cradle Certified Silver"
        }
    },
    {
        id: 12,
        title: "Vari Electric Standing Desk 60x30",
        category: "Office Furniture",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600",
        tag: { label: "Best Seller", scheme: "bestSeller" },
        availability: "In Stock",
        variants: {
            colors: ["Reclaimed Wood", "White", "Black", "Hazelnut Wood"]
        },
        description: "An incredibly sturdy electric height-adjustable desk designed for commercial workspaces. Programmable control keypad stores 4 height presets so transitions from sit to stand take seconds.",
        specifications: {
            "Brand": "Vari",
            "Dimensions": "60 in W x 30 in D (152cm x 76cm)",
            "Height Range": "25 in to 50.5 in (63.5cm to 128cm)",
            "Motors": "Dual Whisper-Quiet Electric Motors",
            "Weight Capacity": "Up to 90 kg",
            "Assembly Time": "Less than 10 minutes (tool included)"
        }
    },
    {
        id: 13,
        title: "Maharam Design Studio Acoustic Panels",
        category: "Office Furniture",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
        availability: "In Stock",
        description: "Sleek wall-mounted acoustic panels from Maharam. Designed to minimize office echo, damp ambient sound in conference rooms, and elevate open workspaces with upscale architectural fabrics.",
        specifications: {
            "Brand": "Maharam Design Studio",
            "NRC Rating": "0.85 (highly sound absorbent)",
            "Material": "Acoustic core wrapped in premium Kvadrat textiles",
            "Thickness": "1.5 inches",
            "Mounting": "Z-Clips (included)"
        }
    },
    {
        id: "jarvis-bamboo",
        title: "Fully Jarvis Bamboo Standing Desk",
        category: "Office Furniture",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600",
        tag: { label: "Eco Friendly", scheme: "new" },
        availability: "In Stock",
        description: "Sustainable bamboo desktop meeting premium electric motors. Dual motors lift up to 150kg smoothly and quietly. Built to last and certified for corporate commercial standards.",
        specifications: {
            "Brand": "Fully (by Herman Miller)",
            "Desktop": "Sustainable, eco-friendly 100% bamboo",
            "Lift Speed": "1.5 inches/second",
            "Memory Preset": "4 programmable heights",
            "Warranty": "15-Year Frame & Motor Warranty"
        }
    },
    {
        id: "humanscale-freedom",
        title: "Humanscale Freedom Headrest Chair",
        category: "Office Furniture",
        image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600",
        tag: { label: "Premium", scheme: "premium" },
        availability: "In Stock",
        description: "Designed by Niels Diffrient, the Freedom chair redefines task seating. Standard weight-sensitive recline automatically adjusts support, and the headrest dynamically moves to support neck positions.",
        specifications: {
            "Brand": "Humanscale",
            "Mechanism": "Weight-activated self-locking recline",
            "Materials": "Premium polymer frame, high-performance textile",
            "Headrest": "Dynamic self-adjusting dynamic headrest",
            "Armrests": "Synchronous adjustable armrests"
        }
    },

    // ==========================================
    // 4. BREAKROOM & JANITORIAL (IDs 14-17, 107-108)
    // ==========================================
    {
        id: 14,
        title: "Nespresso Momento Coffee Machine",
        category: "Breakroom",
        image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600",
        tag: { label: "Essentials", scheme: "standard" },
        availability: "In Stock",
        description: "An elegant, high-capacity commercial single-serve coffee machine built for corporate breakrooms. Intuitive touch display guides users to craft espresso, Americano, and tea infusions with maximum hygiene.",
        specifications: {
            "Brand": "Nespresso Professional",
            "Water Tank Capacity": "3.2 Liters",
            "Spent Capsule Bin": "Up to 40 capsules",
            "Pressure": "19 Bar High Pressure Pump",
            "Heating System": "Dual Thermoblock (under 30s heat-up)",
            "Telemetry Enabled": "Yes, standard for B2B fleet tracking"
        }
    },
    {
        id: 15,
        title: "Eco-Friendly Compostable Paper Cups (1000ct)",
        category: "Breakroom",
        image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600",
        availability: "In Stock",
        variants: {
            sizes: ["8 oz", "12 oz", "16 oz"]
        },
        description: "Premium paper hot beverage cups lined with plant-based PLA lining rather than petroleum plastic. Certified BPI compostable for sustainable corporate breakrooms.",
        specifications: {
            "Brand": "EcoProducts",
            "Quantity": "1000 Cups per Case",
            "Lining Material": "Plant-based Polylactic Acid (PLA)",
            "Heat Tolerance": "Up to 105°C",
            "Certified": "BPI Compostable, ASTM D6400 Compliant"
        }
    },
    {
        id: 16,
        title: "Purell Advanced Hand Sanitizer Dispenser",
        category: "Breakroom",
        image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=600",
        tag: { label: "Safety", scheme: "new" },
        availability: "In Stock",
        description: "Wall-mounted automatic touch-free gel hand sanitizer dispenser. Dispenses the perfect volume of advanced hand sanitizer to eliminate 99.99% of germs on hands.",
        specifications: {
            "Brand": "Purell",
            "Dispenser Type": "Touch-free sensor automated",
            "Refill Capacity": "1200 mL",
            "Material": "ABS Durable Plastic",
            "Battery": "4 x C-cell batteries (included)"
        }
    },
    {
        id: 17,
        title: "Bounty Select-A-Size Paper Towels (12 Rolls)",
        category: "Breakroom",
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=600",
        availability: "In Stock",
        description: "Ultra-absorbent commercial Bounty paper towel rolls with convenient perforated select-a-size sheet boundaries. Highly durable and absorbs spills cleanly without breaking apart.",
        specifications: {
            "Brand": "Bounty Professional",
            "Pack Size": "12 Large Rolls per Pack",
            "Sheet Boundary": "Select-A-Size perforated",
            "Ply Count": "2-Ply Extra Strength",
            "Eco-Friendly": "FSC Certified Sourcing"
        }
    },
    {
        id: "keurig-2500",
        title: "Keurig K-2500 Commercial Coffee Maker",
        category: "Breakroom",
        image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600",
        tag: { label: "Best Seller", scheme: "bestSeller" },
        availability: "In Stock",
        description: "Plumbed-ready high-volume commercial pod coffee maker from Keurig. Fast brewing times, intuitive controls, and a heavy-duty continuous heating tank to handle non-stop office demand.",
        specifications: {
            "Brand": "Keurig Commercial",
            "Pod Support": "K-Cup Commercial Pods",
            "Plumbing Ready": "Yes, direct line connection option",
            "Brew Sizes": "4, 6, 8, 10, 12 ounces",
            "Fulfillment Speed": "Under 45 seconds per cup"
        }
    },
    {
        id: "clorox-wipes",
        title: "Clorox Disinfecting Wipes Bulk Pack",
        category: "Breakroom",
        image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=600",
        availability: "In Stock",
        description: "Commercial multi-surface disinfecting wipes in large canisters. Bleach-free formula kills 99.9% of viruses and bacteria, including cold, flu, and COVID-19 agents. Ideal for office desks and high-touch areas.",
        specifications: {
            "Brand": "Clorox Professional",
            "Pack Count": "3 Packs of 85 Wipes (255 total)",
            "Scent": "Fresh / Citrus blend",
            "Bleach-free": "Yes, safe for electronics",
            "Contact Time": "4 minutes for complete disinfection"
        }
    },

    // ==========================================
    // 5. OFFICE MACHINES (IDs 501-508)
    // ==========================================
    {
        id: 501,
        title: "HP Color LaserJet Pro Multifunction Printer",
        category: "Office Machines",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600",
        tag: { label: "High Volume", scheme: "premium" },
        availability: "In Stock",
        description: "High-velocity color laser enterprise multifunction printer. Supports network scan-to-email, duplex printing, copy functions, and cloud security integrations to protect documents across departments.",
        specifications: {
            "Brand": "HP",
            "Print Tech": "Laser Color",
            "Print Speed": "Up to 35 ppm (pages per minute)",
            "Paper Tray Capacity": "300 sheets (up to 850 with extra tray)",
            "Processor Speed": "1.2 GHz",
            "Ports": "Gigabit Ethernet, Dual Band Wi-Fi, USB 2.0"
        }
    },
    {
        id: 102, // Kept 102 for compatibility with both
        title: "Fellowes Powershred 99Ci Cross-Cut Shredder",
        category: "Office Machines",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",
        tag: { label: "Best Selling", scheme: "bestSeller" },
        availability: "In Stock",
        description: "Commercial cross-cut security shredder equipped with 100% Jam Proof system and patented SafeSense protection that automatically shuts down shredding if hands touch the entry slot.",
        specifications: {
            "Brand": "Fellowes",
            "Cut Type": "Cross-Cut (P-4 Security Rating)",
            "Sheet Capacity": "18 Sheets per pass",
            "Run Time": "30 minutes continuous run, 40 min cool down",
            "Shreds": "Paper, Staples, Paperclips, Credit Cards, CD/DVDs",
            "Bin Capacity": "34 Liters pull-out waste basket"
        }
    },
    {
        id: 503,
        title: "Epson EcoTank L15150 A3 Wi-Fi Duplex",
        category: "Office Machines",
        image: "/products/Epson EcoTank L15150 A3 Wi-Fi Duplex.jpg",
        availability: "In Stock",
        description: "State-of-the-art A3 ink tank printer with exceptionally low operating cost. Delivers professional duplex print, scan, copy, and fax tasks up to A3+ dimensions with high speed.",
        specifications: {
            "Brand": "Epson",
            "Print Tech": "Heat-Free PrecisionCore Ink Tank",
            "Ink Capacity": "Up to 7,500 black pages with 1 bottle set",
            "Duplex Printing": "Yes, automatic up to A3",
            "Maximum Format": "A3+ (Super B)"
        }
    },
    {
        id: 504,
        title: "GBC Fusion 5000L A3 Laminator",
        category: "Office Machines",
        image: "/products/GBC Fusion 5000L A3 Laminator.jpg",
        tag: { label: "Speed Lam", scheme: "standard" },
        availability: "In Stock",
        description: "High-speed professional A3 desktop laminator. Heats up in an incredible 1 minute and laminates a standard document in less than 20 seconds. Automated settings adjust thickness to match the pouch size.",
        specifications: {
            "Brand": "GBC (ACCO Brands)",
            "Warmup Time": "1 Minute",
            "Pouch Thickness": "Up to 250 Micron pouches",
            "Max Width": "A3 (324mm entry)",
            "Indicators": "Visual and Audio readiness"
        }
    },
    {
        id: 505,
        title: "Canon imageRUNNER ADVANCE DX",
        category: "Office Machines",
        image: "/products/Canon imageRUNNER ADVANCE DX.webp",
        tag: { label: "Enterprise Ready", scheme: "standard" },
        availability: "In Stock",
        description: "The enterprise workhorse copier. Offers high-volume production, high-security data encryption, and advanced cloud scanning integrations (uniFLOW Online). Built for large corporate divisions.",
        specifications: {
            "Brand": "Canon",
            "Type": "Console Multifunction Copier",
            "Output Speed": "Up to 55 ppm A4",
            "Screen": "10.1 inch WVGA Color Touch Panel",
            "Standard Capacity": "1,200 sheets, expandable"
        }
    },
    {
        id: 506,
        title: "Brother P-Touch Professional Label Maker",
        category: "Office Machines",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=600",
        availability: "In Stock",
        description: "Durable professional label maker for computer rooms, asset tagging, and office filing. Generates laminated barcode labels, text labels, and cables wraps with heavy-duty durability.",
        specifications: {
            "Brand": "Brother",
            "Label Widths": "Up to 24mm (TZe Tape)",
            "Connectivity": "USB, Wi-Fi, Bluetooth",
            "Print Resolution": "180 DPI high speed",
            "Power Source": "Rechargeable Li-ion Battery / AC Adapter"
        }
    },
    {
        id: 507,
        title: "Paperflow Mobile Literature Display",
        category: "Office Furniture",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
        tag: { label: "Limited Stock", scheme: "standard" },
        availability: "Limited Stock",
        description: "Rolling steel wire display stand for brochures, architectural layout catalog booklets, and literature in corporate lobbies and conference zones. Includes locking heavy-duty casters.",
        specifications: {
            "Brand": "Paperflow",
            "Shelves": "4 adjustable metal shelves",
            "Material": "Reinforced Steel frame",
            "Casters": "4 rolling casters (2 locking)"
        }
    },
    {
        id: 508,
        title: "Durable Sherpa Desk Reference System",
        category: "Office Accessories",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600",
        tag: { label: "New Arrival", scheme: "new" },
        availability: "In Stock",
        description: "Desk reference panel system keeping catalogs, corporate directories, or layout checklists protected and readable at desks. Includes 10 double-sided glare-free polypropylene panels.",
        specifications: {
            "Brand": "Durable",
            "Panels": "10 sleeves (20 reference pages)",
            "Sleeve Size": "A4 / Foolscap",
            "Base": "Weighted anti-slip desk base",
            "Angles": "Adjustable viewing angles"
        }
    }
];

export function getProductById(id: string | number): Product | undefined {
    const stringId = id.toString();
    // Safely look up matching product. Let's do a loose matching or direct comparison
    let found = allProducts.find(product => product.id.toString() === stringId);
    
    // Fallback loose mapping for overlapping IDs
    if (!found) {
        if (stringId === "5") {
            // Moleskine
            return allProducts.find(product => product.id === 5);
        }
        if (stringId === "101") {
            // HP LaserJet / Staedtler
            return allProducts.find(product => product.id === 501);
        }
        if (stringId === "102") {
            // Fellowes
            return allProducts.find(product => product.id === 102);
        }
        if (stringId === "103") {
            // Samsung SSD / Epson
            return allProducts.find(product => product.id === "samsung-980" || product.id === 503);
        }
        if (stringId === "104") {
            // Dell Monitor / GBC Laminator
            return allProducts.find(product => product.id === "dell-27" || product.id === 504);
        }
        if (stringId === "105") {
            // Fully Jarvis / Canon Copier
            return allProducts.find(product => product.id === "jarvis-bamboo" || product.id === 505);
        }
        if (stringId === "106") {
            // Humanscale Chair / Brother
            return allProducts.find(product => product.id === "humanscale-freedom" || product.id === 506);
        }
        if (stringId === "107") {
            // Keurig / Paperflow Display
            return allProducts.find(product => product.id === "keurig-2500" || product.id === 507);
        }
        if (stringId === "108") {
            // Clorox / Durable Sherpa
            return allProducts.find(product => product.id === "clorox-wipes" || product.id === 508);
        }
    }
    return found;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
    return allProducts
        .filter(p => p.id.toString() !== product.id.toString() && p.category === product.category)
        .slice(0, limit);
}
export function getAllProducts(): Product[] {
    return allProducts;
}
export function searchProducts(query: string): Product[] {
    const q = query.toLowerCase();
    return allProducts.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.subCategory && p.subCategory.toLowerCase().includes(q)));
}
