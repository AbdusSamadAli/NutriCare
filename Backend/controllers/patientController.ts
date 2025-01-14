import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createPatient = async (req: Request, res: Response) => {
  const {
    name,
    diseases,
    allergies,
    roomNumber,
    bedNumber,
    floorNumber,
    age,
    gender,
    contactInformation,
    emergencyContact,
  } = req.body;

  try {
    if (
      !name ||
      !diseases ||
      !allergies ||
      !roomNumber ||
      !bedNumber ||
      !floorNumber ||
      !age ||
      !gender ||
      !contactInformation ||
      !emergencyContact
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        diseases,
        allergies,
        roomNumber,
        bedNumber,
        floorNumber,
        age,
        gender,
        contactInformation,
        emergencyContact,
      },
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to create patient." });
  }
};

// Get all patients
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patient.findMany();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patients." });
  }
};

// Get a single patient by ID
export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient." });
  }
};

// Update a patient by ID
export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    diseases,
    allergies,
    roomNumber,
    bedNumber,
    floorNumber,
    age,
    gender,
    contactInformation,
    emergencyContact,
  } = req.body;

  try {
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        diseases,
        allergies,
        roomNumber,
        bedNumber,
        floorNumber,
        age,
        gender,
        contactInformation,
        emergencyContact,
      },
    });

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: "Failed to update patient." });
  }
};

export const deletePatient = async (name: string, res: Response) => {
  if (!name) {
    return res.status(400).json({ error: 'Patient name is required' });
  }

  try {
    const deletedPatient = await prisma.patient.delete({
      where: {
        name: name, 
      },
    });

    if (deletedPatient) {
      return res.status(200).json({ message: 'Patient deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the patient' });
  }
};

