import { Injectable } from '@nestjs/common';
import { User } from '../api/user/entities/user.entity';
import { UserService } from '../api/user/user.service';
import { CryptoService } from '../auth/crypto.service';

@Injectable()
export class SeedService {
  adminUser: User;
  defaultUser: User;

  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {}

  //
  //     private addRandomUsers(names) {
  //         const usersToAdd = [];
  //         for (let i = 0; i < 30; i++) {
  //             const hashedPassword = this.cryptoService.hashPassword(`pass_${i}`);
  //             const firstName = names[i].split(' ')[0];
  //             const lastName = names[i].split(' ')[1];
  //             const newUser = {
  //                 email: `${firstName.toLowerCase()}_${lastName.toLowerCase()}@user.com`,
  //                 login: `@User_${firstName}_${lastName}`,
  //                 firstName,
  //                 lastName,
  //                 role: 'user',
  //                 salt: hashedPassword.salt,
  //                 password: hashedPassword.hash,
  //             };
  //             usersToAdd.push(newUser);
  //         }
  //
  //         return this.userService.addMany(usersToAdd);
  //     }
  //
  //     private static getNames() {
  //         return ['Rostand Simon', 'Petulia Samuel', 'Bacon Mathghamhain', 'Adlei Michael', 'Damian IvorJohn', 'Fredenburg Neil', 'Strader O\'\'Neal', 'Meill Donnell', 'Crowell O\'\'Donnell',
  //             'Lenssen Rory', 'Jac Names', 'Budge Mahoney', 'Bondy Simon', 'Bilow Ahearn', 'Weintrob Farrell', 'Tristan Cathasach', 'Baxy Bradach', 'Utta Damhan', 'Brag Treasach',
  //             'Vallie Kelly', 'Trutko Aodha', 'Mellins Cennetig', 'Zurek Casey', 'Star O\'\'Neal', 'Hoffer Names', 'Sturges Macshuibhne', 'Lifton Sioda', 'Rochell Ahearn', 'Lynsey Mcmahon',
  //             'Delp Seaghdha', 'Sproul O\'\'Brien', 'Omar Ahearn', 'Keriann Bhrighde', 'Killoran Sullivan', 'Olette Riagain', 'Kohn Gorman', 'Shimberg Maurice', 'Nalda Aodh',
  //             'Livvie Casey', 'Zoie Treasach', 'Kletter Daly', 'Sandy Mckay', 'Ern O\'\'Neal', 'Loats Maciomhair', 'Marlena Mulryan', 'Hoshi Naoimhin', 'Schmitt Whalen',
  //             'Patterson Raghailligh', 'Ardeen Kelly', 'Rasla Simon', 'Douty Cennetig', 'Giguere Names', 'Dorina Clark', 'Rothmuller Simon', 'Shabbir Delaney', 'Placidia Bradach',
  //             'Savior Keefe', 'Concettina Maguire', 'Malynda Muirchertach', 'Vanzant Fearghal', 'Schroder Ruaidh', 'Ainslie Ciardha', 'Richter Colman', 'Gianni Macghabhann',
  //             'Norvan O\'\'Boyle', 'Polak Mcneil', 'Bridges Macghabhann', 'Eisenberg Samuel', 'Thenna Daly', 'Moina Mcmahon', 'Gasper Whelan', 'Hutt O\'\'Keefe', 'Quintin Names',
  //             'Towny Reynold', 'Viviane Ceallachan', 'Girovard Power', 'Fanchon Flann', 'Nickolai Meadhra', 'Polash Login', 'Cacilia Macghabhann', 'Chaffee Rory', 'Baseler Conchobhar',
  //             'Amathiste Cuidightheach', 'Ishii Riagain', 'Marieann Damhan', 'Rangel Dubhain', 'Alarick Fionn', 'Humfrey Rory', 'Mable O\'\'Mooney', 'Jemie Macdermott', 'Hogen Rhys',
  //             'Cazzie Mohan', 'Airlie Reynold', 'Safire O\'\'Hannigain', 'Strephonn Nuallan', 'Brion Eoghan', 'Banquer Seaghdha', 'Sedgewinn Mcguire', 'Alma Macghabhann', 'Durward Mcnab'];
  //     }
}
