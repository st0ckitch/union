import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, PlayCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ConsultationCTA() {
  return (
    <section className="py-12 bg-[#f8f8f8]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Consultation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/union/contact"
              className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold">კონსულტაცია</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    მიიღეთ პროფესიონალური რჩევა
                  </p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>

          {/* Video review */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/union/about#videos"
              className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                  <PlayCircle className="h-5 w-5 text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold">მიმოხილვა</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    ვიდეო მიმოხილვები პროდუქციაზე
                  </p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
