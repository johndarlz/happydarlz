import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const useCases = [
  {
    title: "Journalists & Fact-Checkers",
    quote: "Quickly screen incoming tips and stories before investing investigative resources.",
    avatar: "📰",
  },
  {
    title: "Social Media Users",
    quote: "Verify viral posts before sharing. Stop the spread of misinformation in your network.",
    avatar: "📱",
  },
  {
    title: "Educators & Students",
    quote: "Teach critical thinking and media literacy with real-time AI-powered analysis tools.",
    avatar: "🎓",
  },
  {
    title: "Researchers & Analysts",
    quote: "Analyze large volumes of content for patterns of disinformation and propaganda campaigns.",
    avatar: "🔬",
  },
];

const UseCases = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-xs font-display uppercase tracking-widest text-primary">Use Cases</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Who <span className="text-gradient">Benefits</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            From newsrooms to classrooms, VerityAI empowers anyone fighting misinformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {useCases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-4xl mb-4">{item.avatar}</div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed italic">"{item.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
