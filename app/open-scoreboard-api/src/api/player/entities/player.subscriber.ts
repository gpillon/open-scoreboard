import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { Player } from './player.entity';

@EventSubscriber()
export class PlayerSubscriber implements EntitySubscriberInterface<Player> {
  listenTo() {
    return Player;
  }

  async afterLoad(player: Player): Promise<void> {
    player.totalGames =
      player.games && Array.isArray(player.games) ? player.games.length : null;
  }
}
