import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import type { Product } from "@prisma/client";



