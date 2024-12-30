// Interface for 404 page content structure
// Used to maintain type safety and centralize content management
interface NotFoundContent {
    title: string;
    description: string;
}

// Content for the 404 (Not Found) page
// This content is displayed when users try to access non-existent pages
const notFoundContent: NotFoundContent = {
    title: "404",
    description: "Sanırım aradığın şey yok..."
};

export default notFoundContent; 