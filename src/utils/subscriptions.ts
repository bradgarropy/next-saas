import {Subscription} from "types/subscription"
import {supabase} from "utils/supabase"

const createSubscription = async (subscription: Partial<Subscription>) => {
    const {data: newSubscription} = await supabase
        .from<Subscription>("subscriptions")
        .insert(subscription)
        .single()

    return newSubscription
}

const updateSubscription = async (
    userId: Subscription["userId"],
    updates: Partial<Subscription>,
) => {
    const {data: updatedSubscription} = await supabase
        .from("subscriptions")
        .update(updates)
        .eq("userId", userId)
        .single()

    return updatedSubscription
}

const deleteSubscription = async (userId: Subscription["userId"]) => {
    const {data: deletedSubscription} = await supabase
        .from<Subscription>("subscriptions")
        .delete()
        .eq("userId", userId)
        .single()

    return deletedSubscription
}

export {createSubscription, deleteSubscription, updateSubscription}
