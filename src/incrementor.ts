import { Configuration } from "./configuration";
import { SemVer  } from 'semver'

export class VersionIncrementor {
  constructor(
    private token: string,
    private fromTag: string,
    private config: Configuration
  ){}

  async increment(): Promise<IncrementResult> {
    let from = new SemVer(this.fromTag)
    console.log(from)
    let bumped = from.inc('major')
    console.log(bumped)
    return {
      incrementedMajor: bumped.major !== from.major,
      incrementedMinor: bumped.minor !== from.minor,
      incrementedPatch: bumped.patch !== from.patch,
      nextVersion: bumped.version
    }
  }
}

export interface IncrementResult {
  incrementedPatch: boolean,
  incrementedMinor: boolean,
  incrementedMajor: boolean,
  nextVersion: string
}
