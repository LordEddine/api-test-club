import type { Request, Response } from "express";
import prisma from "../prisma/prisma.js";
import { count } from "console";




export const createClub= async(req: Request, res: Response)=>{
    const { name, description, presidentId} = req.body;

    const presidentIdNumber = await prisma.club.findFirst({
        where: { presidentId: presidentId }
    });

    const etudiantPresident = await prisma.student.findFirst({
        where: { id: presidentId }
    })
    
    if(!etudiantPresident){
        return  res.status(400).json({
            success: false,
            message: 'L\'étudiant président n\'existe pas'
        })
    }

    if(presidentIdNumber){
        return res.status(400).json({
            success: false,
            message: 'Cet étudiant est déjà président d\'un club'
        })
    }

    const newclub = await prisma.club.create({
        data: {name, description, presidentId},
        include: { president: true, student: true}
    })

    res.json(newclub)
}

// get all clubs 

export const getAllclubs = async(req: Request, res: Response) =>{
    const { name } = req.query;
    const whereName = name ? 
    {name : { 
        contains: name as string, 
        mode: 'insensitive' as const} } 
    : {}

    const clubs = await prisma.club.findMany({// Select * from club
        where: whereName,
        include: { president: true, student: true, _count: { select: { student: true } } },
        orderBy : {name: 'asc'}
    })

    res.status(200).json({
        success: true,
        data: clubs,
        count: clubs.length})
}

// inscrire un etudiant dans un club 

export const joinClub = async(req: Request, res: Response) =>{
    const etudiantId = Number(req.params.etudiantId)
    const clubId = Number(req.params.clubId)

    // verifier si le club existe
    const club = await prisma.club.findUnique({
        where: { id: clubId},
        include: {student: true}
    })

    if(!club){
        return res.status(404).json({
            success: false,
            message: 'Club n\'existe pas'
        })
    }

    // verifier si l'etudiant existe
    const etudiant = await prisma.student.findUnique({
        where: { id: etudiantId}
    })
    if(!etudiant){
        return res.status(404).json({
            success: false,
            message: 'Étudiant n\'existe pas'
        })
    }

    // verifier si l'etudiant est deja inscrit dans le club
    const isMember = club.student.some(s => s.id === etudiantId); // retourne true ou false
    // map ==> transforme un tableau en un autre tableau

    if(isMember){
        return res.status(400).json({
            success: false,
            message: 'L\'étudiant est déjà inscrit dans ce club'
        })
    }

    // ajouter un etudiant dans le club 
    const updatedClub = await prisma.club.update({
        where: {id: clubId},
        data:{
            student:{
                connect:{ id: etudiantId }
            }
        },
        include: { 
            student: true, 
            president: true}
    })

    res.status(200).json({
        success: true,
        data: updatedClub,
        message: `L'Étudiant ${etudiantId} inscrit avec succès dans le club`
    })
}

// Desinscrire un etudiant d'un club

export const leaveClub = async(req: Request, res: Response) =>{
    const etudiantId = Number(req.params.etudiantId)
    const clubId = Number(req.params.clubId)

    // verifier si le club existe
    const club = await prisma.club.findUnique({
        where: { id: clubId},
        include: {student: true}
    })

    if(!club){
        return res.status(404).json({
            success: false,
            message: 'Club n\'existe pas'
        })
    }

    // verifier si l'etudiant existe
    const etudiant = await prisma.student.findUnique({
        where: { id: etudiantId}
    })
    if(!etudiant){
        return res.status(404).json({
            success: false,
            message: 'Étudiant n\'existe pas'
        })
    }


    // verifier si l'etudiant est membre dans le club
    const isMember = club.student.some(s => s.id === etudiantId); // retourne true ou false
    if(!isMember){
        return res.status(400).json({
            success: false,
            message: `L\'étudiant ${etudiantId} n\'est pas inscrit dans ce club`
        })
    }

    // Verifier si l'etudiant n'est pas le president du club
    if(club.presidentId === etudiantId){
        return res.status(400).json({
            success: false,
            message: `Le président ne peut pas quitter son propre club`
        })
    }


    // retirer un etudiant du club
    const updatedClub = await prisma.club.update({
        where: { id: clubId },
        data:{
            student:{
                disconnect : { id: etudiantId}
            }
        },
        include: {
            student: true,
            president: true
        }
    })

    res.status(200).json({
        success: true,
        data: updatedClub,
        message: `L'Étudiant ${etudiantId} a quitté avec succès le club ${clubId}`
    })
}

// TODO : Ajouter les fonction :
/*
Get Club by ID ....
Delete club ....
Patch club....
*/