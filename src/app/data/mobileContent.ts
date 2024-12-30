// Interface for mobile page content structure
// Used to maintain type safety and centralize content management
interface MobileContent {
    title: string;
    description: string;
    note: string;
}

// Content for the mobile version notice page
// This content is displayed when users access the site from mobile devices
const mobileContent: MobileContent = {
    title: "Mobil Sürüm Geliştiriliyor",
    description: "Siteye erişmek için lütfen bilgisayar kullanınız. Mobil sürüm şu anda geliştirme aşamasındadır.",
    note: "Anlayışınız için teşekkür ederiz."
};

export default mobileContent; 