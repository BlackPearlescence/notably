import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();