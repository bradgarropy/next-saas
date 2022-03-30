import {
    supabaseClient,
    supabaseServerClient,
} from "@supabase/supabase-auth-helpers/nextjs"
import {GetServerSidePropsContext, NextApiRequest} from "next"
import {Subscription} from "types/subscription"

const createSubscription = async (subscription: Partial<Subscription>) => {
    const {data: newSubscription} = await supabaseClient
        .from<Subscription>("subscriptions")
        .insert(subscription)
        .single()

    return newSubscription
}

const readSubscriptionByUser = async (
    context:
        | GetServerSidePropsContext
        | {
              req: NextApiRequest
          },
    userId: Subscription["userId"],
) => {
    const {data: subscription} = await supabaseServerClient(context)
        .from<Subscription>("subscriptions")
        .select("*")
        .eq("userId", userId)
        .single()

    return subscription
}

const updateSubscription = async (
    id: Subscription["id"],
    updates: Partial<Subscription>,
) => {
    const {data: updatedSubscription} = await supabaseClient
        .from("subscriptions")
        .update(updates)
        .eq("id", id)
        .single()

    return updatedSubscription
}

const deleteSubscription = async (id: Subscription["id"]) => {
    const {data: deletedSubscription} = await supabaseClient
        .from<Subscription>("subscriptions")
        .delete()
        .eq("id", id)
        .single()

    return deletedSubscription
}

export {
    createSubscription,
    deleteSubscription,
    readSubscriptionByUser,
    updateSubscription,
}
