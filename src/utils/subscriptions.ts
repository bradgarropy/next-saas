import {Subscription} from "types/subscription"
import {supabase} from "utils/supabase"

const createSubscription = async (subscription: Partial<Subscription>) => {
    const {data: newSubscription} = await supabase
        .from<Subscription>("subscriptions")
        .insert(subscription)
        .single()

    return newSubscription
}

const readSubscriptionByUser = async (userId: Subscription["userId"]) => {
    const {data: subscription} = await supabase
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
    const {data: updatedSubscription} = await supabase
        .from("subscriptions")
        .update(updates)
        .eq("id", id)
        .single()

    return updatedSubscription
}

const deleteSubscription = async (id: Subscription["id"]) => {
    const {data: deletedSubscription} = await supabase
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
