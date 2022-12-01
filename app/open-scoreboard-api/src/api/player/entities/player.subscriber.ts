import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { PlayerScore } from './player-score.entity';

@EventSubscriber()
export class GamePlayerSubscriber
  implements EntitySubscriberInterface<PlayerScore>
{
  listenTo() {
    return PlayerScore;
  }

  async afterLoad(playerScore: PlayerScore): Promise<void> {
    playerScore.totalTime = playerScore.laps
      ? playerScore.laps.some((l) => l === null)
        ? null
        : playerScore.laps.reduce((acc, lap) => acc + lap.lapTime, 0)
      : null;
  }
}
