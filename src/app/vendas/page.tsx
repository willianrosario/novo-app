'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Heart, Baby, Sparkles, Shield, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function VendasPage() {
  const testimonials = [
    {
      name: "Ana Paula Silva",
      role: "Mãe de primeira viagem",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 5,
      text: "Esse app salvou minha vida! Como mãe de primeira viagem, eu estava perdida. Agora sei exatamente quando amamentar, trocar fralda e colocar meu bebê pra dormir. Vale cada centavo!"
    },
    {
      name: "Juliana Costa",
      role: "Mãe solo de gêmeos",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 5,
      text: "Com gêmeos, a organização é TUDO. O app me lembra de cada detalhe e a IA aprende a rotina deles. Não consigo mais viver sem! Melhor investimento que fiz."
    },
    {
      name: "Mariana Oliveira",
      role: "Mãe de 2 filhos",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      rating: 5,
      text: "Já sou mãe experiente, mas esse app me ajudou MUITO com o segundo bebê. Os lembretes inteligentes e o guia de desenvolvimento são incríveis. Super recomendo!"
    },
    {
      name: "Carla Mendes",
      role: "Mãe e empresária",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
      rating: 5,
      text: "Trabalho em casa e preciso de organização. O app me ajuda a equilibrar trabalho e maternidade. Os alertas são perfeitos e nunca mais esqueci nenhuma vacina!"
    },
    {
      name: "Beatriz Santos",
      role: "Mãe de primeira viagem",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      rating: 5,
      text: "A parte de nutrição e introdução alimentar me ajudou demais! Saber exatamente o que oferecer em cada fase tirou toda minha ansiedade. Aplicativo completo!"
    },
    {
      name: "Fernanda Lima",
      role: "Mãe solo",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      rating: 5,
      text: "Como mãe solo, esse app é meu parceiro! Me sinto mais segura e confiante. A IA realmente aprende e me ajuda a antecipar as necessidades do meu bebê. Maravilhoso!"
    }
  ];

  const features = [
    {
      icon: Baby,
      title: "Monitoramento Completo",
      description: "Acompanhe sono, alimentação, banho, fraldas e muito mais em um só lugar"
    },
    {
      icon: Sparkles,
      title: "IA Inteligente",
      description: "Aprende com a rotina do seu bebê e te lembra de tudo no momento certo"
    },
    {
      icon: Heart,
      title: "Guia de Desenvolvimento",
      description: "Saiba o que esperar em cada fase e acompanhe marcos importantes"
    },
    {
      icon: Shield,
      title: "Orientações Seguras",
      description: "Dicas de nutrição, vacinas e cuidados baseadas em evidências"
    },
    {
      icon: Clock,
      title: "Lembretes Automáticos",
      description: "Nunca mais esqueça mamadas, trocas, vacinas ou consultas"
    },
    {
      icon: Users,
      title: "Suporte Emocional",
      description: "Mensagens motivacionais e apoio para mães de primeira viagem"
    }
  ];

  const babyImages = [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2 text-sm">
              🎉 Oferta Especial - Apenas R$ 19,90/mês
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              O Aplicativo que Toda Mãe
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Precisa Ter
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Monitore, organize e cuide do seu bebê com inteligência artificial. 
              Lembretes automáticos, guias completos e suporte 24/7 por apenas R$ 19,90/mês.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  Começar Agora - R$ 19,90/mês
                </Button>
              </Link>
              <p className="text-sm text-gray-500">✨ Cancele quando quiser</p>
            </div>
          </div>

          {/* Baby Images Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {babyImages.map((img, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
                <img src={img} alt={`Bebê feliz ${idx + 1}`} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por que as mães amam nosso app?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para cuidar do seu bebê com confiança e tranquilidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-purple-100 bg-white/80 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              O que as mães estão dizendo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Milhares de mães já transformaram sua rotina com nosso aplicativo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-purple-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Investimento que Vale a Pena
          </h2>
          <p className="text-xl text-purple-100 mb-12">
            Por menos que um café por dia, tenha paz de espírito e organização total
          </p>

          <Card className="p-8 sm:p-12 bg-white/95 backdrop-blur-sm shadow-2xl">
            <div className="mb-8">
              <div className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">
                R$ 19,90
                <span className="text-2xl text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600">Cancele quando quiser, sem compromisso</p>
            </div>

            <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
              {[
                "Monitoramento completo de sono e alimentação",
                "IA que aprende a rotina do seu bebê",
                "Lembretes automáticos inteligentes",
                "Guia de desenvolvimento por fase",
                "Orientações de nutrição e vacinas",
                "Suporte emocional e motivacional",
                "Atualizações constantes e novos recursos",
                "Acesso ilimitado 24/7"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Começar Agora - R$ 19,90/mês
              </Button>
            </Link>

            <p className="text-sm text-gray-500 mt-6">
              🔒 Pagamento seguro • ✨ Cancele quando quiser • 💝 Satisfação garantida
            </p>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Junte-se a milhares de mães felizes
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Transforme sua maternidade com organização, inteligência e muito amor
          </p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              Quero Começar Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-center">
        <p className="text-gray-400">
          © 2024 BabyCare AI - Cuidando do seu bebê com inteligência e amor 💜
        </p>
      </footer>
    </div>
  );
}
