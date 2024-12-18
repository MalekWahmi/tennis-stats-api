import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatsModule } from './modules/stats/stats.module';
import { PlayersModule } from './modules/players/players.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),StatsModule,PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
