import { db } from "@/server/db";

export async function getUser(userId: string) {
	return await db.query.user.findFirst({
		where(fields, operators) {
			return operators.eq(fields.id, userId);
		},
	});
}
