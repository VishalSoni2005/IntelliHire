"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Lightbulb,
  Sparkles,
  Check,
  FileText,
  Hash,
  AlignLeft,
  Download,
  Zap,
  Brain,
  Wand2,
  Stars,
  Rocket,
  MagnetIcon as Magic,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogContent {
  id: number;
  title: string;
  introduction: string;
  outline: string[];
  fullContent: string;
  tags: string[];
  metaDescription: string;
  category: string;
}

export default function ContentSuggestionPage() {
  const [topic, setTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState<BlogContent | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [animateContent, setAnimateContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (generatedContent) {
      setAnimateContent(true);
      const timer = setTimeout(() => setAnimateContent(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [generatedContent]);

  const generateContent = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Enter a topic to generate comprehensive blog content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedContent(null);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockContent: BlogContent = {
      id: 1,
      title: `The Complete Guide to ${topic}: Everything You Need to Know in 2024`,
      introduction: `In today's rapidly evolving digital landscape, understanding ${topic} has become more crucial than ever. Whether you're a beginner looking to get started or an experienced professional seeking to deepen your knowledge, this comprehensive guide will provide you with the insights, strategies, and practical tips you need to master ${topic}.\n\nFrom fundamental concepts to advanced techniques, we'll explore every aspect of ${topic} that matters in 2024. By the end of this guide, you'll have a clear roadmap for success and the confidence to implement what you've learned.`,
      outline: [
        `What is ${topic}? Understanding the Fundamentals`,
        `The Evolution of ${topic}: From Past to Present`,
        `Key Benefits and Applications of ${topic}`,
        `Getting Started: Essential Tools and Resources`,
        `Best Practices and Common Pitfalls to Avoid`,
        `Advanced Strategies for ${topic} Success`,
        `Real-World Case Studies and Examples`,
        `Future Trends and Predictions for ${topic}`,
        `Actionable Steps to Implement Today`,
        `Conclusion and Next Steps`,
      ],
      fullContent: `# The Complete Guide to ${topic}: Everything You Need to Know in 2024

## Introduction

In today's rapidly evolving digital landscape, understanding ${topic} has become more crucial than ever. Whether you're a beginner looking to get started or an experienced professional seeking to deepen your knowledge, this comprehensive guide will provide you with the insights, strategies, and practical tips you need to master ${topic}.

From fundamental concepts to advanced techniques, we'll explore every aspect of ${topic} that matters in 2024. By the end of this guide, you'll have a clear roadmap for success and the confidence to implement what you've learned.

## What is ${topic}? Understanding the Fundamentals

${topic} represents a fundamental shift in how we approach modern challenges. At its core, it encompasses a set of principles, methodologies, and practices that have proven effective across various industries and applications.

### Key Components:
- **Foundation Elements**: The building blocks that make ${topic} effective
- **Core Principles**: Guiding philosophies that drive successful implementation
- **Practical Applications**: Real-world scenarios where ${topic} excels

## The Evolution of ${topic}: From Past to Present

The journey of ${topic} has been marked by significant milestones and breakthrough moments. Understanding this evolution helps us appreciate where we are today and where we're heading.

**Historical Context**: ${topic} emerged from the need to address specific challenges that traditional approaches couldn't solve effectively.

**Modern Developments**: Recent advances have made ${topic} more accessible and powerful than ever before.

## Key Benefits and Applications

Implementing ${topic} offers numerous advantages:

1. **Improved Efficiency**: Streamlined processes and optimized workflows
2. **Enhanced Results**: Better outcomes through proven methodologies
3. **Cost Effectiveness**: Reduced resource requirements and improved ROI
4. **Scalability**: Solutions that grow with your needs
5. **Future-Proofing**: Staying ahead of industry trends and changes

## Getting Started: Essential Tools and Resources

To begin your ${topic} journey, you'll need:

### Essential Tools:
- Primary platforms and software solutions
- Supporting applications and integrations
- Monitoring and analytics tools

### Learning Resources:
- Recommended books and publications
- Online courses and certifications
- Community forums and expert networks

## Best Practices and Common Pitfalls

**Best Practices:**
- Start with clear objectives and measurable goals
- Invest time in proper planning and preparation
- Focus on continuous learning and improvement
- Build strong foundations before advancing to complex strategies

**Common Pitfalls to Avoid:**
- Rushing implementation without proper understanding
- Neglecting to measure and analyze results
- Failing to adapt strategies based on feedback
- Overlooking the importance of ongoing maintenance

## Advanced Strategies for Success

Once you've mastered the basics, consider these advanced approaches:

- **Strategy 1**: Advanced optimization techniques
- **Strategy 2**: Integration with emerging technologies
- **Strategy 3**: Scaling for enterprise-level implementation
- **Strategy 4**: Customization for specific industry needs

## Real-World Case Studies

**Case Study 1**: How Company X achieved 300% improvement using ${topic}
**Case Study 2**: Small business success story with ${topic} implementation
**Case Study 3**: Enterprise-level transformation through ${topic}

## Future Trends and Predictions

Looking ahead, ${topic} is expected to evolve in several key areas:

- Integration with artificial intelligence and machine learning
- Enhanced automation and workflow optimization
- Greater emphasis on user experience and accessibility
- Expansion into new industries and applications

## Actionable Steps to Implement Today

1. **Assess Your Current Situation**: Evaluate where you stand today
2. **Set Clear Goals**: Define what success looks like for you
3. **Create an Implementation Plan**: Break down your approach into manageable steps
4. **Start Small**: Begin with pilot projects to test and learn
5. **Measure and Iterate**: Continuously improve based on results

## Conclusion

${topic} represents a powerful opportunity to transform how you approach your goals and challenges. By following the strategies and insights outlined in this guide, you'll be well-equipped to harness its potential and achieve remarkable results.

Remember, success with ${topic} comes from consistent application, continuous learning, and willingness to adapt. Start implementing these concepts today, and you'll soon see the transformative impact they can have on your work and results.

---

*Ready to take your ${topic} journey to the next level? Start implementing these strategies today and watch your results transform.*`,
      tags: [
        `${topic}`,
        "Guide",
        "2024",
        "Best Practices",
        "Strategy",
        "Implementation",
      ],
      metaDescription: `Comprehensive guide to ${topic} in 2024. Learn fundamentals, best practices, and advanced strategies. Includes real-world examples and actionable implementation steps.`,
      category: "Educational Guide",
    };

    setGeneratedContent(mockContent);
    setIsLoading(false);
  };

  const copyToClipboard = async (content: string, section: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedSection(section);
      toast({
        title: "✨ Copied to clipboard!",
        description: `${section} is ready to paste into your blog.`,
      });

      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  const downloadContent = () => {
    if (!generatedContent) return;

    const content = `Title: ${generatedContent.title}\n\nMeta Description: ${
      generatedContent.metaDescription
    }\n\nTags: ${generatedContent.tags.join(", ")}\n\n${
      generatedContent.fullContent
    }`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, "-").toLowerCase()}-blog-content.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Content downloaded!",
      description: "Your blog content has been saved as a text file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200/20 via-pink-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/15 via-indigo-200/15 to-purple-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-emerald-200/20 via-teal-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-400/40 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-ping delay-1500"></div>
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-pink-400/40 rounded-full animate-ping delay-700"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/20 bg-white/80 backdrop-blur-xl sticky top-0 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                  VishalWrites
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  AI Content Generator
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-sm border border-white/50 rounded-full p-8 shadow-2xl">
                <Brain
                  className="h-16 w-16 text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
              </div>
            </div>

            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Generate</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                Amazing Content
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into captivating blog posts with our
              AI-powered content generator.
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Professional, SEO-optimized, and ready to publish.
              </span>
            </p>
          </div>

          {/* Enhanced Input Section */}
          <div className="mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
              <Card className="relative border-0 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5"></div>
                <CardContent className="relative p-8 md:p-12">
                  <div className="flex flex-col lg:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-3">
                      <label className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                          <Lightbulb className="h-5 w-5 text-purple-600" />
                        </div>
                        What's your topic today?
                      </label>
                      <div className="relative group">
                        <Input
                          type="text"
                          placeholder="Machine Learning, Sustainable Living, Digital Art, Cooking..."
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="h-16 text-lg border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-2xl pl-16 bg-white/80 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300"
                          onKeyPress={(e) =>
                            e.key === "Enter" && generateContent()
                          }
                        />
                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                          <Wand2 className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-auto">
                      <Button
                        onClick={generateContent}
                        disabled={isLoading}
                        className="h-16 px-10 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full lg:w-auto text-lg"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                            <span>Creating Magic...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <Rocket className="h-6 w-6" />
                            <span>Generate Content</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative w-32 h-32 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-600 rounded-full animate-spin animate-reverse"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Crafting Your Masterpiece
              </h3>
              <p className="text-xl text-gray-600 animate-pulse">
                Our AI is weaving words into compelling content...
              </p>
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}

          {/* Enhanced Content Display Section */}
          {generatedContent && !isLoading && (
            <div
              className={`space-y-8 ${
                animateContent ? "animate-fade-in-up" : ""
              }`}
            >
              {/* Content Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
                <Card className="relative border-0 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5"></div>
                  <CardContent className="relative p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            Content Ready! 🎉
                          </h3>
                          <p className="text-gray-600 text-lg">
                            Your complete blog post for "
                            <span className="font-semibold text-purple-600">
                              {topic}
                            </span>
                            " is ready
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={downloadContent}
                          variant="outline"
                          className="flex items-center space-x-2 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 rounded-xl px-6 py-3 bg-transparent"
                        >
                          <Download className="h-5 w-5" />
                          <span>Download</span>
                        </Button>
                        <Button
                          onClick={() =>
                            copyToClipboard(
                              generatedContent.fullContent,
                              "Full Content"
                            )
                          }
                          className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3"
                        >
                          {copiedSection === "Full Content" ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                          <span>Copy All</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Content Tabs */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-xl"></div>
                <Card className="relative border-0 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <Tabs defaultValue="preview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-2 mb-8">
                        <TabsTrigger
                          value="preview"
                          className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="hidden sm:inline font-medium">
                            Preview
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="elements"
                          className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                        >
                          <Hash className="h-4 w-4" />
                          <span className="hidden sm:inline font-medium">
                            Elements
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="outline"
                          className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                        >
                          <AlignLeft className="h-4 w-4" />
                          <span className="hidden sm:inline font-medium">
                            Outline
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="raw"
                          className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="hidden sm:inline font-medium">
                            Raw Text
                          </span>
                        </TabsTrigger>
                      </TabsList>

                      {/* Preview Tab */}
                      <TabsContent value="preview" className="mt-0">
                        <Card className="border-2 border-gray-200/50 rounded-2xl overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200/50">
                            <CardTitle className="flex items-center justify-between text-xl">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                                  <FileText className="h-5 w-5 text-white" />
                                </div>
                                <span>Content Preview</span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyToClipboard(
                                    generatedContent.fullContent,
                                    "Full Content"
                                  )
                                }
                                className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 rounded-lg"
                              >
                                {copiedSection === "Full Content" ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-8">
                            <div
                              ref={contentRef}
                              className="prose prose-lg prose-gray max-w-none"
                              style={{ whiteSpace: "pre-wrap" }}
                            >
                              {generatedContent.fullContent}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Elements Tab */}
                      <TabsContent value="elements" className="mt-0">
                        <div className="grid gap-6 md:grid-cols-2">
                          {/* Title */}
                          <Card className="border-2 border-gray-200/50 hover:border-purple-300/50 transition-all duration-300 rounded-2xl overflow-hidden group">
                            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200/50">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center space-x-2">
                                  <Zap className="h-5 w-5 text-purple-600" />
                                  <span>Blog Title</span>
                                </CardTitle>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedContent.title,
                                      "Title"
                                    )
                                  }
                                  className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 rounded-lg"
                                >
                                  {copiedSection === "Title" ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <p className="font-semibold text-gray-900 text-lg leading-relaxed">
                                {generatedContent.title}
                              </p>
                            </CardContent>
                          </Card>

                          {/* Meta Description */}
                          <Card className="border-2 border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 rounded-2xl overflow-hidden group">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200/50">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center space-x-2">
                                  <Stars className="h-5 w-5 text-blue-600" />
                                  <span>Meta Description</span>
                                </CardTitle>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedContent.metaDescription,
                                      "Meta Description"
                                    )
                                  }
                                  className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-lg"
                                >
                                  {copiedSection === "Meta Description" ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <p className="text-gray-700 leading-relaxed">
                                {generatedContent.metaDescription}
                              </p>
                            </CardContent>
                          </Card>

                          {/* Introduction */}
                          <Card className="md:col-span-2 border-2 border-gray-200/50 hover:border-emerald-300/50 transition-all duration-300 rounded-2xl overflow-hidden group">
                            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200/50">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center space-x-2">
                                  <Brain className="h-5 w-5 text-emerald-600" />
                                  <span>Introduction</span>
                                </CardTitle>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedContent.introduction,
                                      "Introduction"
                                    )
                                  }
                                  className="hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 rounded-lg"
                                >
                                  {copiedSection === "Introduction" ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <p
                                className="text-gray-700 leading-relaxed text-lg"
                                style={{ whiteSpace: "pre-wrap" }}
                              >
                                {generatedContent.introduction}
                              </p>
                            </CardContent>
                          </Card>

                          {/* Tags */}
                          <Card className="border-2 border-gray-200/50 hover:border-pink-300/50 transition-all duration-300 rounded-2xl overflow-hidden group">
                            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-gray-200/50">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center space-x-2">
                                  <Hash className="h-5 w-5 text-pink-600" />
                                  <span>Tags</span>
                                </CardTitle>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedContent.tags.join(", "),
                                      "Tags"
                                    )
                                  }
                                  className="hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 rounded-lg"
                                >
                                  {copiedSection === "Tags" ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="flex flex-wrap gap-3">
                                {generatedContent.tags.map((tag, index) => (
                                  <span
                                    key={tag}
                                    className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                                      index % 3 === 0
                                        ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                                        : index % 3 === 1
                                        ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800"
                                        : "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800"
                                    }`}
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Category */}
                          <Card className="border-2 border-gray-200/50 hover:border-indigo-300/50 transition-all duration-300 rounded-2xl overflow-hidden group">
                            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200/50">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center space-x-2">
                                  <Wand2 className="h-5 w-5 text-indigo-600" />
                                  <span>Category</span>
                                </CardTitle>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedContent.category,
                                      "Category"
                                    )
                                  }
                                  className="hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 rounded-lg"
                                >
                                  {copiedSection === "Category" ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full font-medium">
                                {generatedContent.category}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      {/* Outline Tab */}
                      <TabsContent value="outline" className="mt-0">
                        <Card className="border-2 border-gray-200/50 rounded-2xl overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200/50">
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                                  <AlignLeft className="h-5 w-5 text-white" />
                                </div>
                                <span>Content Outline</span>
                              </CardTitle>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyToClipboard(
                                    generatedContent.outline
                                      .map(
                                        (item, index) => `${index + 1}. ${item}`
                                      )
                                      .join("\n"),
                                    "Outline"
                                  )
                                }
                                className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 rounded-lg"
                              >
                                {copiedSection === "Outline" ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-8">
                            <div className="space-y-4">
                              {generatedContent.outline.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl hover:from-blue-50 hover:to-purple-50/30 transition-all duration-300"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                                    {index + 1}
                                  </div>
                                  <span className="text-gray-800 font-medium text-lg leading-relaxed">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Raw Text Tab */}
                      <TabsContent value="raw" className="mt-0">
                        <Card className="border-2 border-gray-200/50 rounded-2xl overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200/50">
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg">
                                  <Copy className="h-5 w-5 text-white" />
                                </div>
                                <span>Raw Markdown Content</span>
                              </CardTitle>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyToClipboard(
                                    generatedContent.fullContent,
                                    "Raw Content"
                                  )
                                }
                                className="hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 rounded-lg"
                              >
                                {copiedSection === "Raw Content" ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-0">
                            <pre className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-8 overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap font-mono">
                              {generatedContent.fullContent}
                            </pre>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTopic("");
                    setGeneratedContent(null);
                  }}
                  className="flex items-center space-x-3 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 rounded-xl px-8 py-4 text-lg"
                >
                  <Magic className="h-5 w-5" />
                  <span>Create New Content</span>
                </Button>
                <Button
                  onClick={generateContent}
                  disabled={isLoading}
                  className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-xl px-8 py-4 text-lg"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Regenerate Content</span>
                </Button>
              </div>
            </div>
          )}

          {/* Enhanced Empty State */}
          {!generatedContent && !isLoading && (
            <div className="text-center py-20">
              <div className="relative inline-block mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300/30 via-pink-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative w-40 h-40 bg-gradient-to-br from-white via-gray-50 to-white rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                  <div className="relative">
                    <FileText
                      className="h-20 w-20 text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text"
                      style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Create Magic? ✨
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
                Your next viral blog post is just one topic away. Enter anything
                that sparks your curiosity and watch our AI transform it into
                compelling, professional content.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  {
                    text: "AI & Technology",
                    gradient: "from-purple-500 to-blue-500",
                  },
                  {
                    text: "Lifestyle & Wellness",
                    gradient: "from-pink-500 to-rose-500",
                  },
                  {
                    text: "Business Growth",
                    gradient: "from-emerald-500 to-teal-500",
                  },
                  {
                    text: "Creative Arts",
                    gradient: "from-orange-500 to-red-500",
                  },
                ].map((example) => (
                  <button
                    key={example.text}
                    onClick={() => setTopic(example.text)}
                    className={`px-6 py-3 bg-gradient-to-r ${example.gradient} text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    {example.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//! one design
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Copy, Lightbulb, Sparkles, Check } from "lucide-react";
// // import { useToast } from "@/hooks/use-toast";

// interface ContentSuggestion {
//   id: number;
//   title: string;
//   description: string;
//   tags: string[];
// }

// export default function ContentSuggestionPage() {
//   const [topic, setTopic] = useState("");
//   const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [copiedId, setCopiedId] = useState<number | null>(null);
//   const { toast } = useToast();

//   // Mock AI content generation
//   const generateSuggestions = async () => {
//     if (!topic.trim()) {
//       toast({
//         title: "Please enter a topic",
//         description:
//           "Enter a topic or field of interest to get AI suggestions.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     const mockSuggestions: ContentSuggestion[] = [
//       {
//         id: 1,
//         title: `The Ultimate Guide to ${topic}: Everything You Need to Know`,
//         description: `A comprehensive deep-dive into ${topic}, covering fundamentals, advanced concepts, and practical applications for beginners and experts alike.`,
//         tags: ["Guide", "Comprehensive", "Tutorial"],
//       },
//       {
//         id: 2,
//         title: `5 Common Mistakes to Avoid in ${topic}`,
//         description: `Learn from the most frequent pitfalls and mistakes that people make when dealing with ${topic}, and how to avoid them.`,
//         tags: ["Tips", "Mistakes", "Best Practices"],
//       },
//       {
//         id: 3,
//         title: `The Future of ${topic}: Trends and Predictions for 2024`,
//         description: `Explore emerging trends, innovations, and future predictions in the ${topic} space, backed by industry insights and expert opinions.`,
//         tags: ["Trends", "Future", "Predictions"],
//       },
//       {
//         id: 4,
//         title: `${topic} vs Alternatives: A Complete Comparison`,
//         description: `An in-depth comparison of ${topic} with its main alternatives, helping readers make informed decisions based on their specific needs.`,
//         tags: ["Comparison", "Analysis", "Decision Guide"],
//       },
//       {
//         id: 5,
//         title: `How to Get Started with ${topic} in 30 Days`,
//         description: `A step-by-step 30-day roadmap for beginners to master the basics of ${topic} and start seeing real results.`,
//         tags: ["Beginner", "Roadmap", "30-Day Challenge"],
//       },
//     ];

//     setSuggestions(mockSuggestions);
//     setIsLoading(false);
//   };

//   const copyToClipboard = async (suggestion: ContentSuggestion) => {
//     const content = `Title: ${suggestion.title}\n\nDescription: ${
//       suggestion.description
//     }\n\nTags: ${suggestion.tags.join(", ")}`;

//     try {
//       await navigator.clipboard.writeText(content);
//       setCopiedId(suggestion.id);
//       toast({
//         title: "Copied to clipboard!",
//         description: "Content suggestion has been copied to your clipboard.",
//       });

//       // Reset copied state after 2 seconds
//       setTimeout(() => setCopiedId(null), 2000);
//     } catch (error) {
//       console.error("Failed to copy text: ", error);
//       toast({
//         title: "Copy failed",
//         description: "Unable to copy content suggestion. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-center">
//             <div className="flex items-center space-x-2">
//               <Sparkles className="h-8 w-8 text-gray-800" />
//               <h1 className="text-2xl font-bold text-gray-800">VishalWrites</h1>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto">
//           {/* Hero Section */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-6">
//               <Lightbulb className="h-8 w-8 text-gray-600" />
//             </div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               AI Content Suggestions
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Enter any topic or field of interest, and let our AI generate
//               creative blog content ideas tailored for your audience.
//             </p>
//           </div>

//           {/* Input Section */}
//           <div className="bg-gray-50 rounded-2xl p-8 mb-8">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <Input
//                   type="text"
//                   placeholder="Enter your topic (e.g., Machine Learning, Cooking, Travel...)"
//                   value={topic}
//                   onChange={(e) => setTopic(e.target.value)}
//                   className="h-12 text-lg border-gray-200 focus:border-gray-400 focus:ring-gray-400"
//                   onKeyPress={(e) => e.key === "Enter" && generateSuggestions()}
//                 />
//               </div>
//               <Button
//                 onClick={generateSuggestions}
//                 disabled={isLoading}
//                 className="h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white font-medium"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Generating...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <Sparkles className="h-4 w-4" />
//                     <span>Get AI Content Suggestions</span>
//                   </div>
//                 )}
//               </Button>
//             </div>
//           </div>

//           {/* Results Section */}
//           {suggestions.length > 0 && (
//             <div className="space-y-6">
//               <div className="text-center">
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-2">
//                   Content Suggestions for &quot;{topic}&quot;
//                 </h3>
//                 <p className="text-gray-600">
//                   Click the copy button to save any suggestion to your clipboard
//                 </p>
//               </div>

//               <div className="grid gap-6">
//                 {suggestions.map((suggestion, index) => (
//                   <Card
//                     key={suggestion.id}
//                     className="border border-gray-200 hover:border-gray-300 transition-colors"
//                   >
//                     <CardHeader className="pb-3">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center space-x-2 mb-2">
//                             <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
//                               {index + 1}
//                             </span>
//                             <div className="flex flex-wrap gap-1">
//                               {suggestion.tags.map((tag) => (
//                                 <span
//                                   key={tag}
//                                   className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
//                                 >
//                                   {tag}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                           <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
//                             {suggestion.title}
//                           </CardTitle>
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => copyToClipboard(suggestion)}
//                           className="ml-4 flex-shrink-0 h-8 w-8 p-0 hover:bg-gray-100"
//                         >
//                           {copiedId === suggestion.id ? (
//                             <Check className="h-4 w-4 text-green-600" />
//                           ) : (
//                             <Copy className="h-4 w-4 text-gray-500" />
//                           )}
//                         </Button>
//                       </div>
//                     </CardHeader>
//                     <CardContent className="pt-0">
//                       <p className="text-gray-600 leading-relaxed">
//                         {suggestion.description}
//                       </p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setTopic("");
//                     setSuggestions([]);
//                   }}
//                   className="border-gray-300 text-gray-700 hover:bg-gray-50"
//                 >
//                   Clear Results
//                 </Button>
//                 <Button
//                   onClick={generateSuggestions}
//                   disabled={isLoading}
//                   className="bg-gray-900 hover:bg-gray-800 text-white"
//                 >
//                   Generate More Ideas
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {suggestions.length === 0 && !isLoading && (
//             <div className="text-center py-12">
//               <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Lightbulb className="h-12 w-12 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 Ready to spark creativity?
//               </h3>
//               <p className="text-gray-600 max-w-md mx-auto">
//                 Enter a topic above and let our AI generate unique blog content
//                 ideas that will engage your audience and boost your content
//                 strategy.
//               </p>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-gray-100 mt-16">
//         <div className="container mx-auto px-4 py-8">
//           <div className="text-center text-gray-500">
//             <p>© 2024 VishalWrites. Powered by AI creativity.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
