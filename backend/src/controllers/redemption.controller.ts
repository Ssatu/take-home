import { PrismaClient } from '@prisma/client';
import { Handler, Request, Response } from 'express';

const prisma = new PrismaClient();

// 1. Look up staff's pass ID against mapping file (display team)
// getStaffById
const getStaffTeamById: Handler = async (req: Request, res: Response) => {
  const staff_id: string = req.params.id;

  try {
    // We look up the STAFF table for a matching ID and retrieve the team name
    const teamName = await prisma.staff.findUnique({
      select: {
        team_name: true,
      },
      where: {
        id: staff_id,
      },
    });

    // Note to dev: teamName will be null if not found
    res.status(200).json({ teamName: teamName });
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * Verify if the team can redeem their gift by comparing the team name against past
 * redemption in the redemption data
 *
 * @param req Takes in a param {team_name}
 * @param res Returns a response with a boolean on whether redemption is available
 */
const getRedemptionAvailability: Handler = async (req: Request, res: Response) => {
  const teamName: string = req.params.team_name;
  try {
    // We check if the team is valid (exists in TEAMS table)
    const isTeamExisting =
      (await prisma.teams.count({
        where: {
          team_name: teamName,
        },
      })) == 1;

    // We retrieve the number of redemptions the team has made
    const numRedemptions = await prisma.redemption.count({
      where: {
        team_name: teamName,
      },
    });

    // A team may redeem if:
    //  1) It is a valid team
    //  2) It has 0 redemptions in the REDEMPTIONS table
    const isRedemptionAvailable = numRedemptions == 0 && isTeamExisting;

    res.status(200).json({ data: isRedemptionAvailable });
  } catch (e) {
    console.log(e);
  }
};

enum RedemptionMessage {
  SUCCESS = 'Redemption successful!',
  FAILURE = 'This team has already redeemed their gift.',
}

/**
 * Add new redemption to the redemption data if this team is still eligible for
 * redemption, otherwise, do nothing and send the representative away
 * @param req Takes in a param {team_name}
 * @param res Returns a response with a success or failure message as defined in RedemptionMessage
 */
const createRedemption: Handler = async (req: Request, res: Response) => {
  const teamName: string = req.params.team_name;
  const now = new Date();
  try {
    const numRedemptions = await prisma.redemption.count({
      where: {
        team_name: teamName,
      },
    });

    if (numRedemptions != 0) {
      res.status(200).json({ message: RedemptionMessage.FAILURE });
    } else {
      await prisma.redemption.create({
        data: {
          team_name: teamName,
          redeemed_at: now,
        },
      });

      res.status(200).json({ message: RedemptionMessage.SUCCESS });
    }
  } catch (e) {
    console.log(e);
  }
};

export { getStaffTeamById, getRedemptionAvailability, createRedemption };
