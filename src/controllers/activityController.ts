import type { Request, Response } from 'express';
import prisma from '../prisma/prisma';

export const createActivity = async (req: Request, res: Response) => {

    const clubId = Number(req.params.clubId);
    const { title, date} = req.body;


    // Verification des champs obligatoires
    if(!title || !date) {
        return res.status(400).json({
            success: false,
            message: "Title and date are required"
        });
    }

    // Verification du format de la date
    const activityDate = new Date(date);
    if(isNaN(activityDate.getTime())){
        return res.status(400).json({
            success: false,
            message: "Format de date invalide, utilisez le format ISO (ex : 2025-12-01T14:53:00Z)"
        });
    }


    // Verification Existence Club
    const club = await prisma.club.findUnique({
        where: { id: clubId }
    });
    if(!club) {
        return res.status(404).json({
            success: false,
            message: "Club not found"
        });
    }


    // Verifier si une activité avec le même titre existe déjà dans le club pour cette meme date
    const existeActivity = await prisma.activity.findFirst({
        where: {
            clubId : clubId,
            title: title,
            date: activityDate
        }
    })

    if(existeActivity) {
        return res.status(409).json({
            success: false,
            message: `Une activite ${title} existe déjà dans ce club pour la date ${date}`
        });
    }

    const activity = await prisma.activity.create({
        data: {
            title,
            date: activityDate,
            clubId: clubId
        },
        include: { club: true }
    });

    res.status(201).json({
        success: true,
        data: activity
    });


}
