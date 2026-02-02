import ChannelView from "~/components/channel-view";

export default async function DirectMessagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChannelView channelId={id} />;
}
