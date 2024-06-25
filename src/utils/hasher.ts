import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> => {
	try {
		const passwordHash = await bcrypt.hash(password, saltRounds);
		return passwordHash;
	} catch (error) {
		console.error("Error hashing password:", error);
		throw error;
	}
};

export default hashPassword;
