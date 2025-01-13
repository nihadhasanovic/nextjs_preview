// app/clip/[id]/page.tsx

import type { Metadata, ResolvingMetadata } from "next";

// 0️⃣ Force dynamic rendering so each request can fetch fresh data
export const dynamic = "force-dynamic";

/**
 * Type definition for this route's props:
 * - `params` is the dynamic URL segment: /clip/[id]
 * - `searchParams` is optional if you want extra query strings like ?foo=bar
 */
type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


/** 
 * 1️⃣ Example GraphQL query to fetch your clip data
 *    Adjust the fields to match your schema.
 */
const CLIP_QUERY = `
  query MyQuery($id: ID!) {
    getClip(id: $id) {
      media {
        hlsPath
        thumbnailPath
      }
    }
  }
`;

/**
 * 2️⃣ Basic TypeScript interface for the returned data
 */
interface Clip {
  media?: {
    hlsPath?: string;
    thumbnailPath?: string;
  };
}

/**
 * 3️⃣ A helper to fetch from AWS Amplify / AppSync
 */
async function fetchClipById(id: string): Promise<Clip> {
  const apiUrl = 'https://glrocfyez5hrzatsqtr57hsezu.appsync-api.us-east-1.amazonaws.com/graphql';
  const apiKey = 'da2-gahlqp3xkrh7fkajuqd54lghsa'; 

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      query: CLIP_QUERY,
      variables: { id },
    }),
    // If you want fresh data every time, uncomment:
    // cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const result = await response.json();
  // Expect shape: result.data.getClip => { media: { hlsPath, thumbnailPath } }
  return result?.data?.getClip || {};
}

/**
 * 4️⃣ generateMetadata(props: ClipPageProps, parent: ResolvingMetadata)
 *
 * This is where we dynamically build the <head> tags.
 * Next.js calls this on the server each time someone requests /clip/[id].
 */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // The dynamic route param from /clip/[id]
  const id = (await params).id

  // If you also have additional query strings, e.g. /clip/[id]?foo=bar,
  // you can read them from `searchParams.foo`.

  // 1) Fetch the clip data from your GraphQL endpoint
  let clip: Clip;
  try {
    clip = await fetchClipById(id);
  } catch (error) {
    console.error("Error fetching clip:", error);
    return {
      title: `Failed to fetch clip (ID: ${id})`,
      description: "Error loading clip data from AWS Amplify.",
    };
  }

  // 2) If no clip or missing thumbnail, fallback meta
  if (!clip?.media?.thumbnailPath) {
    return {
      title: `Clip Not Found (ID: ${id})`,
      description: `We couldn't find a clip or thumbnail for ID: ${id}.`,
    };
  }


  // 4) Construct dynamic metadata
  const thumbnailUrl = clip.media.thumbnailPath;
  return {
    title: `Clip #${id} | My Next.js App`,
    description: `Dynamically loaded clip #${id} from AWS Amplify (AppSync).`,
    openGraph: {
      title: `Clip #${id} — Watch Now!`,
      description: `Open Graph data for clip #${id}.`,
      url: `https://nextjs-preview-seven.vercel.app/clip/${id}`,
      siteName: "My Next.js App",
      images: [{
        url: thumbnailUrl,
      }],
      type: "website", 
    },
    twitter: {
      card: "summary_large_image",
      title: `Clip #${id} — Watch Now!`,
      description: `Twitter Card data for clip #${id}.`,
      images: thumbnailUrl,
    },
  };
}

/**
 * 5️⃣ The page component that renders for /clip/[id].
 *    You can display the video, some info, etc.
 */
export default async function ClipPage({ params }: Props) {
  return (
    <main style={{ padding: "1rem" }}>
      <h1>Clip #{(await params).id}</h1>
      <p>Check the &lt;head&gt; (use DevTools or Twitter Card Validator) for dynamic SEO tags!</p>
    </main>
  );
}
