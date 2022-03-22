import {renderHook} from "@testing-library/react-hooks"
import {useUser} from "hooks"

test("renders hook", () => {
    const {result} = renderHook(() => useUser())
    expect(result.current).toBeUndefined()
})
