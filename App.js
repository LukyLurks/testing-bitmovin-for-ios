import React, { useEffect, useCallback } from "react";
import { View, Platform, StyleSheet } from "react-native";
import {
  usePlayer,
  SourceType,
  PlayerView,
} from "bitmovin-player-react-native";

export default function PlayerSample() {
  const player = usePlayer({
    // The only required parameter is the license key but it can be omitted from code upon correct
    // Info.plist/AndroidManifest.xml configuration.
    //
    // Head to `Configuring your License` for more information.
    licenseKey: "<ENTER-YOUR-LICENSE-KEY>",
  });

  useEffect(() => {
    player.load({
      url: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
      type: Platform.OS === "ios" ? SourceType.HLS : SourceType.DASH,
      title: "Art of Motion",
    });
  }, [player]);

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  const onReady = useCallback(
    (event) => {
      // Start playback
      player.play();
      console.log(event.timestamp);
    },
    [player]
  );

  return (
    <View style={styles.flex1}>
      <PlayerView style={styles.flex1} player={player} onReady={onReady} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
