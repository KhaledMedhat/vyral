import { IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

const posts = [
  {
    title: "Introducing Vyral 2.0: A New Era of Messaging",
    excerpt:
      "We're excited to announce the biggest update to Vyral yet, featuring redesigned interface, improved performance, and new collaboration tools.",
    date: "Dec 1, 2025",
    readTime: "5 min read",
    category: "Product",
    image: "/chat-app-interface.png",
  },
  {
    title: "End-to-End Encryption: How We Keep Your Messages Safe",
    excerpt: "A deep dive into our encryption protocols and the technology that ensures your conversations remain private and secure.",
    date: "Nov 25, 2025",
    readTime: "8 min read",
    category: "Security",
    image: "/encryption-security.jpg",
  },
  {
    title: "Building Better Group Chats: Tips and Best Practices",
    excerpt: "Learn how to make the most of Vyral's group chat features for your team, family, or community.",
    date: "Nov 18, 2025",
    readTime: "4 min read",
    category: "Tips",
    image: "/group-chat-team.jpg",
  },
  {
    title: "Vyral for Teams: Boost Your Team's Productivity",
    excerpt: "Discover how businesses are using Vyral to streamline communication and improve collaboration across their organizations.",
    date: "Nov 10, 2025",
    readTime: "6 min read",
    category: "Business",
    image: "/business-team-collaboration.png",
  },
  {
    title: "The Future of Messaging: AI and Beyond",
    excerpt: "Exploring how artificial intelligence is shaping the future of communication and what it means for Vyral users.",
    date: "Nov 5, 2025",
    readTime: "7 min read",
    category: "Technology",
    image: "/ai-technology-future.png",
  },
  {
    title: "How We Built Vyral: Our Engineering Journey",
    excerpt: "A behind-the-scenes look at the technical decisions and challenges we faced while building Vyral from the ground up.",
    date: "Oct 28, 2025",
    readTime: "10 min read",
    category: "Engineering",
    image: "/software-engineering-code.jpg",
  },
];

export default function BlogPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Latest news, updates, and insights from the Vyral team</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-accent/50 transition-colors">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                    {post.category}
                  </Badge>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <IconCalendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconClock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="#" className="inline-flex items-center gap-2 text-accent hover:underline font-medium">
            View all posts
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
