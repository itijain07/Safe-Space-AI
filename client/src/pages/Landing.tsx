import { Link } from 'wouter';
import { ArrowRight, Lock, Zap, BarChart3, Shield, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ROUTES } from '@/routes';
import { motion } from 'framer-motion';

export default function Landing() {
  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Completely Private',
      description: 'Everything stays on your device. No cloud, no servers, no tracking.',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Analysis',
      description: 'Local AI understands your mood and emotions without leaving your browser.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Emotional Insights',
      description: 'Track your mood patterns and discover what influences your well-being.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Instant analysis and smooth writing experience with zero latency.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Your Data, Your Control',
      description: 'Export your journals anytime. You own everything you write.',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Beautiful Design',
      description: 'A serene, distraction-free space for your thoughts and reflections.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Write Freely',
      description: 'Express your thoughts and feelings without judgment or limits.',
    },
    {
      number: '02',
      title: 'Get Insights',
      description: 'AI analyzes your mood, themes, and emotional patterns instantly.',
    },
    {
      number: '03',
      title: 'Track Progress',
      description: 'Watch your emotional journey unfold with beautiful visualizations.',
    },
    {
      number: '04',
      title: 'Reflect & Grow',
      description: 'Use insights to understand yourself better and make positive changes.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
            transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
          

          <div className="container relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                Your Private AI Journal
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
                A sanctuary for your thoughts. Powered by AI that respects your privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.DASHBOARD}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Writing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 bg-card/30">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Why Choose Safe Space AI?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need for meaningful journaling, all running locally on your device.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="text-primary mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple, intuitive process to understand yourself better.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {steps.map((step, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 relative">
                    <div className="text-5xl font-display font-bold text-primary/20 mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-primary/40" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="py-20 md:py-32 bg-card/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                  Your Privacy Matters
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-2xl font-semibold">100% Local Processing</h3>
                  <p className="text-muted-foreground">
                    All AI analysis happens directly in your browser. No data is sent to servers or third parties.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-2xl font-semibold">You Control Your Data</h3>
                  <p className="text-muted-foreground">
                    Export your journals anytime in standard formats. Delete everything with one click.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-2xl font-semibold">No Accounts Required</h3>
                  <p className="text-muted-foreground">
                    Start journaling immediately. No sign-ups, no emails, no tracking.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-2xl font-semibold">Open Source Values</h3>
                  <p className="text-muted-foreground">
                    Built with privacy-first principles. Your trust is our foundation.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Start Journaling?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Begin your journey of self-discovery today. Your private AI journal awaits.
              </p>
              <Link href={ROUTES.DASHBOARD}>
                <a>
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
