import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  RelationshipCreated,
  SignatureChecked
} from "../generated/RelationshipRegistry/RelationshipRegistry"

export function createRelationshipCreatedEvent(
  relationship: Address,
  parent1: Address,
  parent2: Address
): RelationshipCreated {
  let relationshipCreatedEvent = changetype<RelationshipCreated>(newMockEvent())

  relationshipCreatedEvent.parameters = new Array()

  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "relationship",
      ethereum.Value.fromAddress(relationship)
    )
  )
  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam("parent1", ethereum.Value.fromAddress(parent1))
  )
  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam("parent2", ethereum.Value.fromAddress(parent2))
  )

  return relationshipCreatedEvent
}

export function createSignatureCheckedEvent(result: boolean): SignatureChecked {
  let signatureCheckedEvent = changetype<SignatureChecked>(newMockEvent())

  signatureCheckedEvent.parameters = new Array()

  signatureCheckedEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromBoolean(result))
  )

  return signatureCheckedEvent
}
