import type { Metadata } from 'next';

// Sample blog data - in a real app this would come from a CMS or API
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'from-pollution-to-art',
    title: 'From Pollution to Art: The Journey of Air-to-Ink',
    excerpt: 'How we transform harmful air pollutants into beautiful, non-toxic ink for creative expression.',
    image: '/images/blog/pollution-to-art.jpg',
    category: 'Innovation',
    date: 'April 15, 2023',
    readTime: '5 min read',
    tags: ['innovation', 'sustainability', 'art'],
    featured: true,
    author: {
      name: 'Emma Chen',
      role: 'Environmental Scientist & Artist',
      avatar: '/images/blog/authors/emma-chen.jpg'
    },
    content: `
      <p class="lead">At AuaLine, we're committed to turning environmental challenges into creative solutions. Our signature Air-to-Ink technology represents years of research, innovation, and a passion for cleaner air and artistic expression.</p>
      
      <h2>The Genesis of an Idea</h2>
      <p>It all started with a simple observation: vehicle exhaust and industrial emissions were polluting our air with carbon particles that harm human health. But what if these same particles could be captured before entering our lungs and transformed into something useful and beautiful?</p>
      
      <p>Our founder, Dr. Ava Patel, was walking through downtown Toronto when she noticed the blackened walls of a tunnel, coated with years of exhaust residue. "That's pure carbon," she thought, "the same basic material used in traditional ink." That moment of inspiration led to five years of intensive research and development.</p>
      
      <h2>The Capture Process</h2>
      <p>Our proprietary technology uses specially designed devices that attach to vehicle exhaust pipes and industrial chimneys. These devices capture particulate matter (specifically PM2.5 and PM10) that would otherwise be released into the atmosphere.</p>
      
      <p>The collected carbon is then processed through several stages:</p>
      <ul>
        <li>Initial collection of raw carbon particulate</li>
        <li>Separation from other pollutants and heavy metals</li>
        <li>Purification to remove toxic components</li>
        <li>Processing into a fine, consistent powder</li>
      </ul>
      
      <blockquote>
        <p>We're not just making ink—we're cleaning the air, one exhaust pipe at a time.</p>
        <cite>— Dr. Ava Patel, Founder of AuaLine</cite>
      </blockquote>
      
      <h2>From Carbon to Ink</h2>
      <p>The purified carbon becomes the pigment base for our ink. We combine it with eco-friendly binders, stabilizers, and flow agents to create ink with exceptional properties:</p>
      
      <ul>
        <li>Rich, deep black tones that traditional inks struggle to achieve</li>
        <li>Excellent lightfastness and water resistance</li>
        <li>Smooth flow and minimal bleeding on various paper types</li>
        <li>Non-toxic formulation safe for artists and the environment</li>
      </ul>
      
      <h2>Environmental Impact</h2>
      <p>Each 30ml bottle of AuaLine ink represents approximately 45 minutes of diesel engine emissions that have been captured rather than released into the atmosphere. To date, our technology has prevented over 2,500 kg of carbon particulate from entering the air we breathe.</p>
      
      <p>But we're just getting started. Our vision extends beyond ink to other applications where captured carbon can replace virgin materials, closing the loop and creating a circular economy for what was once considered nothing but harmful waste.</p>
      
      <h2>The Future of Air-to-Ink</h2>
      <p>We're continuously improving our technology and exploring new applications. Current research includes:</p>
      
      <ul>
        <li>Expanding our color palette by incorporating natural pigments</li>
        <li>Developing specialized formulations for industrial printing</li>
        <li>Creating washable ink options for educational settings</li>
        <li>Scaling our capture technology for broader environmental impact</li>
      </ul>
      
      <p>Our journey from pollution to art represents the kind of innovative thinking needed to address environmental challenges. By seeing waste not as an endpoint but as a resource waiting to be transformed, we can create products that are not just less harmful, but actively beneficial for our planet.</p>
    `,
    relatedPosts: [2, 3, 5]
  },
  {
    id: 2,
    slug: 'creative-techniques-with-eco-ink',
    title: 'Creative Techniques to Try With Your Eco-Friendly Ink',
    excerpt: 'Discover new artistic techniques that showcase the unique properties of our air-purified ink.',
    image: '/images/blog/creative-techniques.jpg',
    category: 'Tutorials',
    date: 'May 2, 2023',
    readTime: '8 min read',
    tags: ['tutorials', 'creativity', 'techniques'],
    featured: false,
    author: {
      name: 'Marco Alvarez',
      role: 'Head of Artist Relations',
      avatar: '/images/blog/authors/marco-alvarez.jpg'
    },
    content: `<p>Sample content for creative techniques article.</p>`,
    relatedPosts: [1, 4, 6]
  },
  {
    id: 3,
    slug: 'environmental-impact-of-traditional-ink',
    title: 'The Environmental Impact of Traditional Ink Manufacturing',
    excerpt: 'Understanding the ecological footprint of conventional ink production and how sustainable alternatives help.',
    image: '/images/blog/environmental-impact.jpg',
    category: 'Environment',
    date: 'March 10, 2023',
    readTime: '6 min read',
    tags: ['environment', 'sustainability', 'research'],
    featured: false,
    author: {
      name: 'Dr. Samira Khan',
      role: 'Environmental Research Lead',
      avatar: '/images/blog/authors/samira-khan.jpg'
    },
    content: `<p>Sample content for environmental impact article.</p>`,
    relatedPosts: [1, 5, 6]
  },
  {
    id: 4,
    slug: 'artist-spotlight-maya-greene',
    title: 'Artist Spotlight: Maya Greene and Her Pollution-Based Masterpieces',
    excerpt: 'How renowned artist Maya Greene is using AuaLine inks to create environmental awareness through art.',
    image: '/images/blog/artist-spotlight.jpg',
    category: 'Artists',
    date: 'June 5, 2023',
    readTime: '7 min read',
    tags: ['artists', 'interviews', 'inspiration'],
    featured: true,
    author: {
      name: 'Jade Wong',
      role: 'Arts & Culture Writer',
      avatar: '/images/blog/authors/jade-wong.jpg'
    },
    content: `<p>Sample content for artist spotlight article.</p>`,
    relatedPosts: [1, 2, 6]
  },
  {
    id: 5,
    slug: 'future-of-sustainable-art-supplies',
    title: 'The Future of Sustainable Art Supplies',
    excerpt: 'Exploring innovations in eco-friendly art materials and how they\'re changing the creative industry.',
    image: '/images/blog/future-sustainable.jpg',
    category: 'Trends',
    date: 'May 28, 2023',
    readTime: '4 min read',
    tags: ['trends', 'future', 'sustainability'],
    featured: false,
    author: {
      name: 'Thomas Okonkwo',
      role: 'Innovation Director',
      avatar: '/images/blog/authors/thomas-okonkwo.jpg'
    },
    content: `<p>Sample content for future of sustainable art supplies article.</p>`,
    relatedPosts: [1, 3, 6]
  },
  {
    id: 6,
    slug: 'school-programs-environmental-art',
    title: 'How Schools Are Incorporating Environmental Art in Education',
    excerpt: 'Educational institutions that are teaching sustainability through art with eco-friendly supplies.',
    image: '/images/blog/school-programs.jpg',
    category: 'Education',
    date: 'April 30, 2023',
    readTime: '6 min read',
    tags: ['education', 'schools', 'environmental'],
    featured: false,
    author: {
      name: 'Sofia Mendoza',
      role: 'Education Program Manager',
      avatar: '/images/blog/authors/sofia-mendoza.jpg'
    },
    content: `<p>Sample content for school programs article.</p>`,
    relatedPosts: [2, 3, 5]
  }
];

// This function is required for static export
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find(post => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(post => post.slug === params.slug);
  const relatedPosts = post 
    ? BLOG_POSTS.filter(p => post.relatedPosts.includes(p.id)).slice(0, 3)
    : [];
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-4">
        <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Article Not Found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/blog" 
          className="flex items-center text-eco-leaf hover:underline"
        >
          Back to all articles
        </a>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero section */}
      <section className="relative h-[50vh] md:h-[60vh] bg-gradient-to-r from-emerald-800 to-emerald-950 flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <a 
            href="/blog" 
            className="inline-flex items-center text-sm text-white/80 hover:text-white mb-6 transition-colors"
          >
            Back to all articles
          </a>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl mx-auto">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-white/80 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">{post.category}</span>
            <span className="flex items-center">
              {post.date}
            </span>
            <span className="flex items-center">
              {post.readTime}
            </span>
          </div>
        </div>
      </section>
      
      {/* Article content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Author info */}
            <div className="flex items-center mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 mr-4">
                {/* This would be an actual image in a real application */}
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{post.author.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{post.author.role}</p>
              </div>
            </div>
            
            {/* Article body */}
            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-800 dark:prose-headings:text-white prose-a:text-eco-leaf prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-medium mb-4 text-slate-800 dark:text-white flex items-center">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <a
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-xl font-bold mb-8 text-slate-800 dark:text-white">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden">
                      <a href={`/blog/${relatedPost.slug}`} className="block">
                        <div className="p-4">
                          <h3 className="font-medium text-slate-800 dark:text-white line-clamp-2 mb-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 