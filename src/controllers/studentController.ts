import type { Request, Response } from "express";
import prisma from "../prisma/prisma.js";

// créer un étudiant
export const createStudent = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Le nom et l\'email sont requis'
            })
        }

        const student = await prisma.student.create({
            data: { name, email}
        })

        res.status(201).json({
            success: true,
            student
        })

    } catch (error: any) {
        if(error.code === 'P2002'){
            return res.status(400).json({
                success: false,
                message: 'Cet email existe déjà'
            })
        }
    }
}


// lister tous les étudiants
export const getAllStudents = async(req: Request, res: Response)=>{
    try{
        const students = await prisma.student.findMany({
            include:{ clubs: true }
        })

        res.status(200).json({
            success: true,
            data: students,
        })

    } catch (error: any){
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des étudiants',
            error: error.message
        })
    }
}
// PATCH 
export const modifierStudent = async(req:Request, res:Response) =>{
    try{
    const id = req.params.id;
    const { name, email} = req.body;
    
    const idNumber = Number(id);
    const updateData: { name?: string; email?: string}={}
    if(name) updateData.name = name;
    if(email) updateData.email = email;

    const student = await prisma.student.update({
        where: { id: idNumber},
        data: updateData
    })

    res.status(200).json({
        success: true,
        data:student
    })
    } catch (error: any){
        if(error.code === 'P2025'){ // En cas ou absence dans la base de donnee
            return res.status(404).json({
                success: false,
                message: 'Étudiant non trouvé'
            })
        }

        if(error.code === 'P2002'){ // En cas ou repition d'un unique
            return res.status(404).json({
                success: false,
                message: 'Email déjà utilisé'
            })
        }

        res.status(500).json({
            message: 'Erreur lors de la modification de l\'étudiant',
            success: false,
            error: error.message
        })

        console.log(error);
    }
}

// Récupérer un étudiant par ID
export const getStudentById = async(req: Request, res: Response) => {
    const id = Number(req.params.id);

    const student = await prisma.student.findUnique({
        where : {id},
        include: {
            clubs: true, 
            presidentClub: true}
    })
    res.json(student)
}

// Delete Etudiant 
export const deleteStudent = async(req: Request, res: Response) =>{
    const id = Number(req.params.id);

    await prisma.student.delete({
        where: {id}
    })
    res.status(200).json({
        success: true, 
        message : `Étudiant avec l'id ${id} supprimé avec succès`})
}
