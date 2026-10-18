'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { SearchModal } from '@/components/catholic/search-modal'
import { Heading, Text, Eyebrow } from '@/components/ui'

export default function AboutPage() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <main>
        {/* Hero */}
        <div className="bg-primary px-[var(--spacing-section-x)] pt-[72px] pb-16 text-center">
          <div className="mx-auto max-w-[640px]">
            <Eyebrow as="p" className="mb-5">Sobre</Eyebrow>
            <Heading
              as="h1"
              level="display"
              color="on-dark"
              className="font-light leading-[1.25]"
            >
              Uma busca por{' '}
              <em className="italic text-accent-hover">profundidade</em>,<br />
              não por superfície.
            </Heading>
          </div>
        </div>

        {/* Content */}
        <div className="bg-surface px-[var(--spacing-section-x)] py-[72px]">
          <div className="article-inner flex flex-col gap-6 font-sans text-[17px] font-light text-foreground leading-[1.85]">
            <p>
              Sou Gustavo Rodrigues Fabiano — desenvolvedor de software e católico praticante.
              Há alguns anos comecei a sentir que a fé que recebi na infância precisava ser
              aprofundada. Não era insatisfação. Era fome.
            </p>

            <p>
              Comecei a ler: Santo Agostinho, São Tomás de Aquino, Santa Teresa de Ávila,
              São João da Cruz. Descobri que quanto mais estudava, mais a fé se tornava viva,
              inteligente, enraizada — e mais eu queria partilhá-la.
            </p>

            <Heading as="h2" level="h2" className="text-[28px] font-medium leading-[1.2] mt-4">
              Por que este espaço existe
            </Heading>

            <p>
              Criei este espaço para registrar o que estou aprendendo. Escrever obriga a pensar
              com clareza. E partilhar convida outros a pensar junto.
            </p>

            <p>
              Não sou teólogo. Não sou filósofo. Sou um estudante. Tudo aqui é uma tentativa
              honesta de compreender — não um pronunciamento de autoridade.
            </p>

            <Heading as="h2" level="h2" className="text-[28px] font-medium leading-[1.2] mt-4">
              O que você vai encontrar aqui
            </Heading>

            <p>
              Estudos sobre espiritualidade, teologia, filosofia e vida cristã. Às vezes breves
              — uma ideia, uma citação. Às vezes longos — um tema desenvolvido com cuidado.
            </p>

            <p>
              O fio que une tudo:{' '}
              <em className="italic text-accent">
                fides quaerens intellectum
              </em>{' '}
              — a fé em busca de compreensão. A convicção de que crer e pensar não se excluem,
              mas se iluminam.
            </p>

            <div className="mt-4 pt-8 border-t border-border">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 bg-primary text-accent-hover border border-accent rounded-pill px-7 py-3 font-sans text-[12px] font-semibold tracking-[0.12em] uppercase no-underline hover:bg-accent hover:text-on-accent transition-colors duration-[var(--transition-fast)]"
              >
                Começar a explorar
              </Link>
            </div>
          </div>
        </div>

        {/* Citation band */}
        <div className="bg-surface-alt-1 border-t border-b border-accent-border px-[var(--spacing-section-x)] py-12 text-center">
          <p className="font-serif text-[22px] italic text-foreground max-w-[560px] mx-auto mb-3 leading-[1.5]">
            "Nosso coração está inquieto até que encontre repouso em Ti."
          </p>
          <Text as="p" size="sm" weight="bold" color="accent" className="tracking-[0.12em] uppercase">
            — Santo Agostinho, Confissões
          </Text>
        </div>
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
