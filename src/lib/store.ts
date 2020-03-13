const channelMap: Record<string, string[]> = {};

export function addChannelFunnel(toChannel: string, fromChannels: string[]): void {
    channelMap[toChannel] = fromChannels;
}

export function getChannelsFor(toChannel: string): string[] {
    return channelMap[toChannel];
}
