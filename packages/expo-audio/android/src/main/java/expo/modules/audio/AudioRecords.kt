package expo.modules.audio

import android.media.MediaRecorder
import android.os.Build
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.types.Enumerable

class AudioSource(
  @Field val uri: String?,
  @Field val headers: Map<String, String>?
) : Record

class AudioMode(
  @Field val shouldPlayInBackground: Boolean = false,
  @Field val shouldRouteThroughEarpiece: Boolean?,
  @Field val interruptionMode: InterruptionMode?
) : Record

// Data class because we want `equals`
data class RecordingOptions(
  @Field val extension: String,
  @Field val sampleRate: Double?,
  @Field val numberOfChannels: Double?,
  @Field val bitRate: Double?,
  @Field val outputFormat: AndroidOutputFormat?,
  @Field val audioEncoder: AndroidAudioEncoder?,
  @Field val maxFileSize: Int?,
  @Field val isMeteringEnabled: Boolean = false,
  @Field val audioSource: RecordingSource = RecordingSource.MIC
) : Record

enum class AndroidOutputFormat(val value: String) : Enumerable {
  DEFAULT("default"),
  THREE_GP("3gp"),
  MPEG_4("mpeg4"),
  AMR_NB("amrnb"),
  AMR_WB("amrwb"),
  AAC_ADTS("aac_adts"),
  MPEG2TS("mpeg2ts"),
  WEBM("webm");

  fun toMediaOutputFormat(): Int {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      if (this == MPEG2TS) {
        return MediaRecorder.OutputFormat.MPEG_2_TS
      }
    }

    return when (this) {
      DEFAULT -> MediaRecorder.OutputFormat.DEFAULT
      THREE_GP -> MediaRecorder.OutputFormat.THREE_GPP
      MPEG_4 -> MediaRecorder.OutputFormat.MPEG_4
      AMR_NB -> MediaRecorder.OutputFormat.AMR_NB
      AMR_WB -> MediaRecorder.OutputFormat.AMR_WB
      AAC_ADTS -> MediaRecorder.OutputFormat.AAC_ADTS
      WEBM -> MediaRecorder.OutputFormat.WEBM
      else -> MediaRecorder.OutputFormat.DEFAULT
    }
  }
}

enum class AndroidAudioEncoder(val value: String) : Enumerable {
  DEFAULT("default"),
  AMR_NB("amr_nb"),
  AMR_WB("amr_wb"),
  AAC("aac"),
  HE_AAC("he_aac"),
  AAC_ELD("aac_eld");

  fun toMediaEncoding() = when (this) {
    DEFAULT -> MediaRecorder.AudioEncoder.DEFAULT
    AMR_NB -> MediaRecorder.AudioEncoder.AMR_NB
    AMR_WB -> MediaRecorder.AudioEncoder.AMR_WB
    AAC -> MediaRecorder.AudioEncoder.AAC
    HE_AAC -> MediaRecorder.AudioEncoder.HE_AAC
    AAC_ELD -> MediaRecorder.AudioEncoder.AAC_ELD
  }
}

enum class InterruptionMode(val value: String) : Enumerable {
  DO_NOT_MIX("doNotMix"),
  DUCK_OTHERS("duckOthers")
}


enum class RecordingSource(val value: String) : Enumerable {
  CAMCORDER("camcorder")
  DEFAULT("default")
  MIC("mic")
  REMOTE_SUBMIX("remote_submix")
  UNPROCESSED("unprocessed")
  VOICE_CALL("voice_call")
  VOICE_COMMUNICATION("voice_communication")
  VOICE_DOWNLINK("voice_downlink")
  VOICE_PERFORMANCE("voice_performance")
  VOICE_RECOGNITION("voice_recognition")
  VOICE_UPLINK("voice_uplink")

  fun toAudioSource() = when (this) {
    CAMCORDER -> MediaRecorder.AudioSource.CAMCORDER
    DEFAULT -> MediaRecorder.AudioSource.DEFAULT
    MIC -> MediaRecorder.AudioSource.MIC
    REMOTE_SUBMIX -> MediaRecorder.AudioSource.REMOTE_SUBMIX
    UNPROCESSED -> MediaRecorder.AudioSource.UNPROCESSED
    VOICE_CALL -> MediaRecorder.AudioSource.VOICE_CALL
    VOICE_COMMUNICATION -> MediaRecorder.AudioSource.VOICE_COMMUNICATION
    VOICE_DOWNLINK -> MediaRecorder.AudioSource.VOICE_DOWNLINK
    VOICE_PERFORMANCE -> MediaRecorder.AudioSource.VOICE_PERFORMANCE
    VOICE_RECOGNITION -> MediaRecorder.AudioSource.VOICE_RECOGNITION
    VOICE_UPLINK -> MediaRecorder.AudioSource.VOICE_UPLINK
  }
}