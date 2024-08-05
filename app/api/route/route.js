import { fetchAProducts } from '@/app/lib/data';
import { connectToDB } from '@/app/lib/utils';

// Named export for GET method
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const cat = searchParams.get('cat') || 'all'; // Default to 'all' if not provided

  try {
    await connectToDB();
    const data = await fetchAProducts(q, page, cat); // Pass the category to fetchAProducts
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch products', { status: 500 });
  }
}
