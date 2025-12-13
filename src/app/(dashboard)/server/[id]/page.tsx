export default async function ServerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    // slug === '%40me' ? <Channels /> :
    <h1>{id}</h1>
  );
}
