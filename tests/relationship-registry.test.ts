import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ExampleEntity } from "../generated/schema"
import { RelationshipCreated } from "../generated/RelationshipRegistry/RelationshipRegistry"
import { handleRelationshipCreated } from "../src/relationship-registry"
import { createRelationshipCreatedEvent } from "./relationship-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let relationship = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let parent1 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let parent2 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newRelationshipCreatedEvent = createRelationshipCreatedEvent(
      relationship,
      parent1,
      parent2
    )
    handleRelationshipCreated(newRelationshipCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("ExampleEntity", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "relationship",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "parent1",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "parent2",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
