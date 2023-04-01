import Head from "next/head";

interface Props {
  title: string;
}

export default function SEO({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="Shindi Toyama" />
      <meta name="description" content="Todo List com Next.js e TailwindCSS." />
      <meta name="keywords" content="Todo, Todo List" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
