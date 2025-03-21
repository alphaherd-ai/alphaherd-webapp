import prismaClient from '../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {
    
    if (req.method !== 'GET') {
        return new Response('Method not allowed',{status:405});
    } 
    try {
        const user = await prismaClient.user.findUnique({
            where:{
                id:Number(params.id)
            },
            include: {
                adminOrganizations: {
                    select: {
                        id: true,
                        orgName: true,
                        address: true
                    }
                },
                userRoles: {}
            }
        });
        
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }
        
        return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("GET user error:", error);
        return new Response(JSON.stringify({ 
            message: "Failed to fetch user data", 
            error: error instanceof Error ? error.message : "Unknown error" 
        }), { 
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } finally {
        await prismaClient.$disconnect();
    }
}

export const PUT = async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const body = await req.json();
            const {name, phoneNo, altPhoneNo, email, imageUrl} = body;
            
            // Validate required fields
            if (!name || !phoneNo || !email) {
                return new Response(JSON.stringify({ 
                    message: "Name, phone number, and email are required" 
                }), { 
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }
            
            // Create update data object with proper type handling
            const updateData: any = {
                name,
                // Ensure phoneNo is a string as expected by Prisma
                phoneNo: String(phoneNo),
                email
            };
            
            // Handle optional fields properly
            if (altPhoneNo !== undefined) {
                // Ensure altPhoneNo is a string or null
                updateData.altPhoneNo = altPhoneNo ? String(altPhoneNo) : null;
            }
            
            if (imageUrl !== undefined) {
                updateData.imageUrl = imageUrl;
            }
            
            console.log("Update data:", updateData);
            
            const user = await prismaClient.user.update({
                where: {
                    id: Number(params.id)
                },
                data: updateData,
                include: {
                    adminOrganizations: {
                        select: {
                            id: true,
                            orgName: true,
                            address: true
                        }
                    },
                    userRoles: {}
                }
            });
            
            return new Response(JSON.stringify({ 
                message: "User updated successfully",
                user 
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Update user error:", error);
            
            // Handle specific database errors
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            
            // Check for Prisma validation errors
            if (errorMessage.includes("Invalid value provided")) {
                return new Response(JSON.stringify({ 
                    message: "Invalid data format", 
                    error: errorMessage 
                }), { 
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }
            
            // Check for common Prisma errors
            if (errorMessage.includes("Unique constraint failed")) {
                return new Response(JSON.stringify({ 
                    message: "Email already exists", 
                    error: errorMessage 
                }), { 
                    status: 409, // Conflict
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }
            
            return new Response(JSON.stringify({ 
                message: "Failed to update user", 
                error: errorMessage 
            }), { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } finally {
            await prismaClient.$disconnect();
        }
    }